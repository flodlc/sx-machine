import React from 'react';
import { Box, createSxComponentWithRef } from 'sx-machine';

export const Card = createSxComponentWithRef<
  'div',
  { children?: React.ReactNode }
>(({ children, sx, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      sx={[
        {
          boxShadow: (theme) => theme.shadows.$1,
          '> div': {
            color: (theme) => theme.colors.$secondary,
          },
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
});
