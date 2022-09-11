const marginTransform = (value: number) => value * 4;

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
  padding: { transform: marginTransform },
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
