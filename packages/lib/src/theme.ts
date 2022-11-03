import { THEME_KEYS } from './rules';
export const defaultTheme = {
  scales: THEME_KEYS,
  shadows: { 1: '0 0 10px 0 black' },
  spaces: Object.fromEntries(
    new Array(300).fill(0).map((it, i) => [i - 59, `${(i - 59) / 4}rem`])
  ),
} as const;

export type GenericTheme = Record<
  string | number,
  string | number | Record<string | number, string | number>
>;

export type Theme = typeof defaultTheme & { [k: string]: unknown };
