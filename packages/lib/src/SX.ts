type ThemeUICSSObject = any;
import { Theme } from './theme';

type StyleObject = ThemeUICSSObject | ((theme: Theme) => ThemeUICSSObject);

export type SX = StyleObject | (SX | undefined)[];
