import { ThemeProvider, useTheme } from '@emotion/react';
import { ReactNode } from 'react';

import { Theme } from './index';
import { StrictTheme } from './theme';

export const InternalThemeProvider = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: StrictTheme;
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const internalUseTheme = (): Theme => useTheme() as any;
