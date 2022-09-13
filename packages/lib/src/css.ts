import * as CSS from 'csstype';
import get from 'lodash.get';

import { ALIASES, SCALES, THEME_KEYS } from './rules';

type CSSProperties = CSS.Properties<number, string>;

type StyleFromScale<P extends keyof typeof SCALES> =
  | Parameters<typeof SCALES[P]['transform']>[0]
  | (Parameters<typeof SCALES[P]['transform']>[0] | null)[];

type StyleFromCSSProperties<P extends keyof CSSProperties> =
  | CSSProperties[P]
  | (CSSProperties[P] | null)[];

type StyleProperty<P extends keyof CSSProperties | keyof typeof SCALES> =
  P extends keyof typeof SCALES
    ? StyleFromScale<P>
    : P extends keyof CSSProperties
    ? StyleFromCSSProperties<P>
    : unknown;

type Properties =
  | {
      [P in keyof CSSProperties | keyof typeof SCALES]?:
        | StyleProperty<P>
        | Properties;
    } & {
      [p: string]:
        | Properties
        | StyleProperty<keyof CSSProperties | keyof typeof SCALES>;
    };

export type InputStyle = Properties & {
  [T in keyof typeof ALIASES]?: typeof ALIASES[T] extends keyof Properties
    ? Properties[typeof ALIASES[T]]
    : undefined;
};

type CSS =
  | {
      [P in keyof CSSProperties]?: CSSProperties[P];
    } & { [t: string]: CSS | CSSProperties[keyof CSSProperties] };

export function css({
  theme = {} as never,
  breakpoints = [0, 30, 48, 62, 80, 96].map((n) => n + 'em'),
}: {
  theme: Record<
    string | number,
    string | number | Record<string | number, string | number>
  >;
  breakpoints?: string[];
}): (sx: InputStyle) => CSSProperties {
  return (sx: InputStyle) => {
    return computeProp(sx);

    function computeProp(style: InputStyle): CSS {
      return Object.keys(style).reduce((acc, key) => {
        const resolvedKey =
          key in ALIASES ? ALIASES[key as keyof typeof ALIASES] : key;
        const value = style[key as keyof InputStyle];
        if (!value) return acc;

        if (Array.isArray(value)) {
          return breakpoints.reduce((accu, breakpoint, index) => {
            const breakpointRule = `@media (min-width: ${breakpoint})`;
            const breakpointValue = value[index];
            if (breakpointValue === null || breakpointValue === undefined)
              return accu;
            const computedBreakpointValue = computeValue({
              key: resolvedKey as keyof InputStyle,
              value: breakpointValue,
            });
            if (!computedBreakpointValue) return accu;

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
        if (!value) return acc;

        if (typeof value === 'object') {
          return { ...acc, [resolvedKey]: computeProp(value) };
        }

        const computedValue = computeValue({
          key: resolvedKey as keyof InputStyle,
          value,
        });
        if (!computedValue) return acc;

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
      value: string | number | boolean;
    }) {
      const themedValue =
        typeof value === 'string' || typeof value === 'number'
          ? get(
              theme,
              `${
                key in THEME_KEYS
                  ? `${THEME_KEYS[key as keyof typeof THEME_KEYS]}.`
                  : ''
              }${value}`,
              value
            )
          : value;

      const property =
        key in SCALES ? SCALES[key as keyof typeof SCALES] : undefined;
      return property
        ? property.transform(themedValue as never)
        : (themedValue as CSSProperties[keyof CSSProperties] | CSSProperties);
      // themedValue as CSSProperties[keyof CSSProperties] | CSSProperties
    }
  };
}
