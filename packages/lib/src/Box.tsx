import React, { forwardRef } from 'react';

import { css } from './css';
import { GenericComponent } from './GenericComponent';
import { SCALES } from './rules';
import { SX } from './SX';
import { Theme } from './theme';

const getStyle = (sx?: SX) => {
  if (sx) {
    if (!Array.isArray(sx)) {
      return (theme: Theme) =>
        css({
          theme,
          SCALES,
        })(sx);
    }
    return (theme: Theme) =>
      sx.flat(20).map((style: any) =>
        css({
          theme,
          SCALES,
        })(style)
      );
  }
};

type Box = GenericComponent<'div', { children?: React.ReactNode }>;

export const Box: Box = forwardRef<React.ElementType, Parameters<Box>[0]>(
  ({ children, sx, as = 'div', ...props }, ref) => {
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
