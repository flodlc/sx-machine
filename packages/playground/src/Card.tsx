import React from 'react';
import { Box, GenericComponent } from 'themebox';

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
        { padding: 7, border: '1px solid', borderColor: 'colors.primary' },
        sx,
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};
