export const TRANSFORMS = {
  paddingY: (value: number) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  paddingX: (value: number) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  marginY: (value: number) => ({
    marginTop: value,
    marginBottom: value,
  }),
  marginX: (value: number) => ({
    marginLeft: value,
    marginRight: value,
  }),
} as const;

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
