import * as CSS from 'csstype';
import get from 'lodash.get';

import { Theme } from './index';
import { ALIASES, TRANSFORMS } from './rules';

type CSSProperties = CSS.Properties<number, string>;

type FromMultiple<P extends keyof typeof TRANSFORMS> = keyof ReturnType<
  typeof TRANSFORMS[P]
>;

type StyleFromTheme<P extends string> = P extends keyof Theme['scales']
  ? Theme extends {
      [D in Theme['scales'][P]]: Theme[D];
    }
    ? keyof Theme[Theme['scales'][P]]
    : never
  : never;

type StyleFromCSSProperties<P extends keyof CSSProperties> =
  | CSSProperties[P]
  | (CSSProperties[P] | null)[]
  | ((theme: Theme) => CSSProperties[P] | (CSSProperties[P] | null)[]);

type StyleProper<P extends keyof CSSProperties | keyof Theme['scales']> =
  P extends keyof typeof TRANSFORMS
    ? FromMultiple<P> extends
        | keyof CSSProperties
        | keyof Theme['scales']
        | keyof typeof TRANSFORMS
      ? StyleProper<FromMultiple<P>>
      : never
    : P extends keyof CSSProperties
    ? StyleFromCSSProperties<P> | StyleFromTheme<P>
    : StyleFromTheme<P>;

type Properties =
  | {
      [P in keyof CSSProperties | keyof Theme['scales']]?:
        | StyleProper<P>
        | Properties;
    } & {
      [p: string]:
        | Properties
        | StyleProper<keyof CSSProperties | keyof Theme['scales']>;
    };

export type InputStyle =
  | Properties & {
      [T in keyof typeof ALIASES]?: typeof ALIASES[T] extends keyof Properties
        ? Properties[typeof ALIASES[T]]
        : undefined;
    };

type CSS =
  | {
      [P in keyof CSSProperties]?: CSSProperties[P];
    } & { [t: string]: CSS | CSSProperties[keyof CSSProperties] };
export function css({
  theme,
  breakpoints = [0, 30, 48, 62, 80, 96].map((n) => n + 'em'),
}: {
  theme: Theme;
  breakpoints?: string[];
}): (sx: InputStyle) => CSSProperties {
  return (sx: InputStyle) => {
    return computeProp(sx);

    function computeProp(style: InputStyle): CSS {
      return Object.keys(style).reduce((acc, key) => {
        const resolvedKey =
          key in ALIASES ? ALIASES[key as keyof typeof ALIASES] : key;

        const brutValue = style[key as keyof InputStyle];

        const value =
          typeof brutValue === 'function' ? brutValue(theme) : brutValue;

        if (isNil(value)) return acc;

        if (Array.isArray(value)) {
          return breakpoints.reduce((accu, breakpoint, index) => {
            const breakpointRule = `@media (min-width: ${breakpoint})`;
            const breakpointValue = value[index];

            if (isNil(breakpointValue)) return accu;

            const computedBreakpointValue = computeValue({
              key: resolvedKey as keyof InputStyle,
              value: breakpointValue,
            });

            if (isNil(computedBreakpointValue)) return accu;

            if (typeof computedBreakpointValue === 'object') {
              return {
                ...accu,
                [breakpointRule]: {
                  ...(accu[breakpointRule] as CSS | undefined),
                  ...computedBreakpointValue,
                },
              };
            }

            return {
              ...accu,
              [breakpointRule]: {
                ...(accu[breakpointRule] as CSS | undefined),
                [resolvedKey]: computedBreakpointValue,
              },
            };
          }, acc);
        }
        // if (!value) return acc;

        if (typeof value === 'object') {
          return { ...acc, [resolvedKey]: computeProp(value) };
        }

        const computedValue = computeValue({
          key: resolvedKey as keyof InputStyle,
          value,
        });
        if (isNil(computedValue)) return acc;

        if (typeof computedValue === 'object') {
          return { ...acc, ...computedValue };
        }
        return { ...acc, [resolvedKey]: computedValue };
      }, {} as CSS);
    }

    function computeValue<K extends keyof InputStyle>({
      key,
      value,
    }: {
      key: K;
      value: string | boolean | number;
    }) {
      const themedValue =
        typeof value === 'string' || typeof value === 'number'
          ? get(
              theme,
              `${
                key in theme.scales
                  ? `${theme.scales[key as keyof typeof theme.scales]}.`
                  : ''
              }${value}`,
              value
            )
          : value;

      const scale =
        key in TRANSFORMS
          ? TRANSFORMS[key as keyof typeof TRANSFORMS]
          : undefined;

      return scale
        ? scale(themedValue as never)
        : (themedValue as CSSProperties[keyof CSSProperties] | CSSProperties);
      // themedValue as CSSProperties[keyof CSSProperties] | CSSProperties
    }
  };
}

const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined;
