import React from 'react';
// @ts-ignore
import hash from 'stable-hash';

import { css, InputStyle } from './css';
import { Theme } from './index';
import { SX } from './SX';
import { createSxComponent } from './SxComponent';

const CACHE = new Map<string, any>();

const useStyle = (sx?: SX) => {
  const sxHash = hash(sx) as string;
  const cachedSx = CACHE.get(sxHash);
  if (cachedSx) {
    return cachedSx;
  }
  CACHE.set(cachedSx, sx);

  if (sx) {
    if (!Array.isArray(sx)) {
      const style = (theme: Theme) =>
        css({
          theme,
        })(sx);
      CACHE.set(hash(sx), style);
      return style;
    }
    const style = (theme: Theme) =>
      sx.flat(20).map(
        (style) =>
          style &&
          css({
            theme,
          })(style as InputStyle)
      );
    CACHE.set(hash(sx), style);
    return style;
  }
};

// type Box = SxComponent<'div', { children?: React.ReactNode }>;

export const Box = createSxComponent<'div', { children?: React.ReactNode }>(
  ({ children, sx, as = 'div', ref, ...props }) => {
    CACHE.set(hash({ sx, as, ...props }), true);
    const Tag = as;
    const style = useStyle(sx);
    if (!style) {
      return (
        <Tag ref={ref} {...props}>
          {children}
        </Tag>
      );
    }
    return (
      <Tag ref={ref} {...props} css={style}>
        {children}
      </Tag>
    );
  }
);

export const Card = createSxComponent<'div', { children?: React.ReactNode }>(
  ({ children, sx, ...props }) => {
    return (
      <Box sx={[sx]} {...props}>
        {children}
      </Box>
    );
  }
);
