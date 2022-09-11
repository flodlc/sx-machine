import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, theme, ThemeProvider } from 'themebox';

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
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
