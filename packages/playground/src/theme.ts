import { defaultTheme } from 'themebox';

export const theme = {
  ...defaultTheme,
  scales: {
    ...defaultTheme.scales,
    height: 'spaces',
    width: 'spaces',
  },
  heights: {
    $large: '1000px',
    $medium: '100px',
  },
  colors: {
    $primary: 'grey',
    $sec: 'blue',
  },
  shadows: { $1: '0 0 10px 0 grey' },
} as const;
