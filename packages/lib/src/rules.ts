const marginTransform = (value: number) => value;

export const SCALES = {
  paddingY: {
    transform: (value: number) => ({
      paddingTop: marginTransform(value),
      paddingBottom: marginTransform(value),
    }),
  },
  paddingX: {
    transform: (value: number) => ({
      paddingLeft: marginTransform(value),
      paddingRight: marginTransform(value),
    }),
  },
  // padding: { transform: marginTransform },
  paddingLeft: { transform: marginTransform },
  paddingRight: { transform: marginTransform },
  paddingTop: { transform: marginTransform },
  paddingBottom: { transform: marginTransform },
  marginY: {
    transform: (value: number) => ({
      marginTop: marginTransform(value),
      marginBottom: marginTransform(value),
    }),
  },
  marginX: {
    transform: (value: number) => ({
      marginLeft: marginTransform(value),
      marginRight: marginTransform(value),
    }),
  },
  margin: { transform: marginTransform },
  marginLeft: { transform: marginTransform },
  marginRight: { transform: marginTransform },
  marginTop: { transform: marginTransform },
  marginBottom: { transform: marginTransform },
};

export const THEME_KEYS = {
  color: 'colors',
  backgroundColor: 'colors',
  background: 'colors',
  borderColor: 'colors',
  fontFamily: 'fonts',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  borderRadius: 'radii',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  padding: 'spaces',
  paddingLeft: 'spaces',
  paddingRight: 'spaces',
  paddingTop: 'spaces',
  paddingBottom: 'spaces',
  paddingY: 'spaces',
  paddingX: 'spaces',
  marginLeft: 'spaces',
  marginRight: 'spaces',
  marginTop: 'spaces',
  marginBottom: 'spaces',
  marginY: 'spaces',
  marginX: 'spaces',
  gridGap: 'spaces',
  gridColumnGap: 'spaces',
  gridRowGap: 'spaces',
  fontSizes: 'fontSizes',
} as const;

export const ALIASES = {
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
  bg: 'background',
} as const;
