import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, ThemeProvider } from 'themebox';

import { Card } from './Card';
import { theme } from './theme';

const Wrapper = () => {
  return (
    <>
      {new Array(1).fill(0).map((od, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            flexDirection: ['column', null, 'row'],
          }}
        >
          <Box
            sx={[
              {
                background: 'primary',
                p: 4,
                color: 'primary',
                flex: 1,
                m: 2,
              },
            ]}
          >
            hey
          </Box>
          <Box
            sx={{
              background: 'blue',
              p: 4,
              color: 'white',
              flex: 1,
              m: 2,
            }}
          />
          <Card sx={{ flex: 1, m: 2, boxShadow: 1 }}>My Card</Card>
        </Box>
      ))}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Wrapper />
  </ThemeProvider>
);
