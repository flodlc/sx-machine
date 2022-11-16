import { Box, ThemeProvider } from '@flodlc/sxmachine';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Card } from './Card';
import { theme } from './theme';

const Wrapper = () => {
  return (
    <>
      <Box sx={{ m: 10, height: '$10', width: '$10', bg: '$primary' }}></Box>
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
                background: '$primary',
                p: 4,
                color: 'white',
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
          <Card sx={{ flex: 1, m: 2, boxShadow: '$1' }}>
            My Card <div>toto</div>
          </Card>
        </Box>
      ))}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Wrapper />
  </ThemeProvider>
);
