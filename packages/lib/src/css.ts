import * as CSS from 'csstype';
import get from 'lodash.get';

const ALIASES = {
  ml: 'marginLeft',
  mr: 'marginRight',
  mt: 'marginTop',
  mb: 'marginBottom',
  m: 'margin',
  my: 'marginY',
  mx: 'marginX',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  p: 'padding',
  py: 'paddingY',
  px: 'paddingX',
} as const;

const SCZA = {
  paddingY: {
    transform: (value: number) => ({
      paddingTop: value * 4,
      paddingBottom: value * 4,
    }),
  },
  marginLeft: {
    transform: (value: number) => value * 4,
  },
  color: {
    transform: (value: string) => value,
  },
};

type CSSProperties = CSS.Properties<number, string>;
type CSSPropertiesFallback = CSS.PropertiesFallback<number, string>;

type StyleFromScale<P extends keyof typeof SCZA> =
  | Parameters<typeof SCZA[P]['transform']>[0]
  | Parameters<typeof SCZA[P]['transform']>[0][];

type StyleProperty<P extends keyof CSSPropertiesFallback | keyof typeof SCZA> =
  P extends keyof typeof SCZA
    ? StyleFromScale<P>
    : P extends keyof CSSPropertiesFallback
    ? CSSPropertiesFallback[P]
    : unknown;

type Properties =
  | {
      [P in keyof CSSPropertiesFallback | keyof typeof SCZA]?:
        | StyleProperty<P>
        | Properties;
    } & {
      [p: string]:
        | Properties
        | StyleProperty<keyof CSSPropertiesFallback | keyof typeof SCZA>;
    };

type CSS =
  | {
      [P in keyof CSSProperties]?: CSSProperties[P];
    } & { [t: string]: CSS | CSSProperties[keyof CSSProperties] };

type SX = Properties & {
  [T in keyof typeof ALIASES]?: typeof ALIASES[T] extends keyof Properties
    ? Properties[typeof ALIASES[T]]
    : undefined;
};

export function css<
  R extends Record<
    string,
    // eslint-disable-next-line no-unused-vars
    { transform: (value: never) => string | number | boolean | CSSProperties }
  >
>({
  theme = {} as never,
  SCALES,
  breakpoints = [0, 30, 48, 62, 80, 96].map((n) => n + 'em'),
}: {
  theme: Record<
    string | number,
    string | number | Record<string | number, string | number>
  >;
  SCALES: R;
  breakpoints?: string[];
  // eslint-disable-next-line no-unused-vars
}): (sx: SX) => CSSProperties {
  return (sx: SX) => {
    return computeProp(sx);

    function computeProp(style: SX): CSS {
      return Object.keys(style).reduce((acc, key) => {
        const resolvedKey =
          key in ALIASES ? ALIASES[key as keyof typeof ALIASES] : key;
        const value = style[key as keyof SX];
        // console.log(sx, resolvedKey, key, value);
        if (!value) return acc;

        if (Array.isArray(value)) {
          return breakpoints.reduce((accu, breakpoint, index) => {
            const breakpointRule = `@media (min-width: ${breakpoint})`;
            const breakpointValue = value[index];
            if (breakpointValue === undefined) return accu;
            const computedBreakpointValue = computeValue({
              key: resolvedKey as keyof SX,
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
          key: resolvedKey as keyof SX,
          value,
        });
        if (!computedValue) return acc;

        if (typeof computedValue === 'object') {
          return { ...acc, ...computedValue };
        }
        return { ...acc, [resolvedKey]: computedValue };
      }, {} as CSS);
    }

    function computeValue<K extends keyof SX>({
      key,
      value,
    }: {
      key: K;
      value: string | number | boolean;
    }) {
      const themedValue =
        typeof value === 'string' ? get(theme, value, value) : value;

      const property =
        key in SCALES ? SCALES[key as keyof typeof SCALES] : undefined;
      return (
        property ? property.transform(themedValue as never) : themedValue
      ) as CSSProperties[keyof CSSProperties] | CSSProperties;
    }
  };
}

console.log(
  css({
    theme: {
      primary: '#23349I',
      colors: { primary: 'green' },
    },
    SCALES: {
      paddingY: {
        transform: (value: number) => ({
          paddingTop: value * 4,
          paddingBottom: value * 4,
        }),
      },
      marginLeft: {
        transform: (value: number) => value * 4,
      },
    },
  })({
    color: 'colors.primary',
    marginLeftd: {
      color: 'dsf',
    },
  })
);
