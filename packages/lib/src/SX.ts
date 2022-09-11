import { InputStyle } from './css';

// import { Theme } from './theme';
// type StyleObject = InputStyle | ((theme: Theme) => ThemeUICSSObject);

export type SX = InputStyle | (SX | undefined)[];
