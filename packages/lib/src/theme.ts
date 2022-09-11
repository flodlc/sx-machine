const colors = {
  primary: '#FD825F',
};

export const theme = {
  colors: colors,
  shadows: {
    1: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
    2: '0 2px 8px 0px rgba(0, 0, 0, 0.13)',
    3: '0 2px 12px 1px rgba(0, 0, 0, 0.10)',
  },
} as const;

export type Theme = typeof theme;
