import React from 'react';
import { Box, GenericComponent, useTheme } from 'themebox';

type Card = GenericComponent<
  'div',
  {
    children?: React.ReactNode;
  }
>;

export const Card: Card = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={[
        {
          boxShadow: (theme) => theme.shadows[1],
          p: 10,
          border: '1px solid',
          borderColor: 'colors.primary',
        },
        sx,
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};
