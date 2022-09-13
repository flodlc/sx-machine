export const theme = {
  colors: {
    primary: '#FD825F',
  },
  shadows: {
    1: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
    2: '0 2px 8px 0px rgba(0, 0, 0, 0.13)',
    3: '0 2px 12px 1px rgba(0, 0, 0, 0.10)',
  },
  spaces: Object.fromEntries(
    new Array(120).fill(0).map((it, i) => [i - 59, `${(i - 59) / 4}rem`])
  ),
} as const;

export type Theme = typeof theme;
