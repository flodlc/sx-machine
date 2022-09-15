export const defaultTheme = {} as const;

export type GenericTheme = Record<
  string | number,
  string | number | Record<string | number, string | number>
>;

export type Theme = typeof defaultTheme;
