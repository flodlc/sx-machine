import { theme } from './theme';

type CustomTheme = typeof theme;

declare module 'sx-machine' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
