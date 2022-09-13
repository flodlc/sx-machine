import React, { forwardRef } from 'react';

import { css, InputStyle } from './css';
import { GenericComponent } from './GenericComponent';
import { stableHash } from './hash';
import { SX } from './SX';
import { Theme } from './theme';

const CACHE = new Map<string, any>();

const getStyle = (sx?: SX) => {
  const sxHash = stableHash(sx);
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
      CACHE.set(stableHash(sx), style);
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
    CACHE.set(stableHash(sx), style);
    return style;
  }
};

type Box = GenericComponent<'div', { children?: React.ReactNode }>;

export const Box: Box = forwardRef<React.ElementType, Parameters<Box>[0]>(
  ({ children, sx, as = 'div', ...props }, ref) => {
    CACHE.set(stableHash({ sx, as, ...props }), true);
    const Tag = as;
    const style = getStyle(sx);
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
