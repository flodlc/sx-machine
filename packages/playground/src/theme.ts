import { defaultTheme } from 'themebox';

export const theme = {
  ...defaultTheme,
  scales: {
    ...defaultTheme.scales,
    height: 'heights',
  },
  heights: { large: '1000px', medium: '100px' },
  colors: {
    primary: 'grey',
    sec: 'blue',
  },
} as const;
