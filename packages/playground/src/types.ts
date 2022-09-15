import type { Theme as DTheme } from './index';

declare module '@emotion/react' {
  export interface Theme extends DTheme {
    f: undefined;
  }
}
