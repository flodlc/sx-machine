import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, theme, ThemeProvider } from 'themebox';

import { Card } from './Card';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', null, 'row'],
        }}
      >
        <Box
          sx={[
            {
              background: 'blue',
              p: 4,
              color: 'white',
              flex: 1,
              m: 2,
            },
          ]}
        >
          My box
        </Box>
        <Box
          sx={{
            background: 'blue',
            p: 4,
            color: 'white',
            flex: 1,
            m: 2,
          }}
        >
          My box
        </Box>
        <Card sx={{ flex: 1, m: 2 }}>My Card</Card>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
