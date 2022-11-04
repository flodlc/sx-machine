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
        {
          boxShadow: (theme) => theme.shadows.$1,
          bg: '$primary',
          p: '$12',
          border: '1px solid',
          borderColor: '$sec',
        },
        sx,
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};
