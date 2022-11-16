import { createTheme, defaultTheme } from 'sx-machine';

export const theme = createTheme({
  ...defaultTheme,
  colors: {
    $primary: 'grey',
    $secondary: 'blue',
    $other: 'blue',
  },
  shadows: {
    $1: '2px 0 10px 0 grey',
    $2: '2px 0 20px 0 grey',
    $3: '2px 0 20px 0 grey',
  },
});
