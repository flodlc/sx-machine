import { Box, createGenericComponentWithRef } from '@flodlc/sxmachine';
import React from 'react';

export const Card = createGenericComponentWithRef<
  'div',
  { children?: React.ReactNode }
>(({ children, sx, ...props }) => {
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
});
