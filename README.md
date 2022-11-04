## Themebox

### themebox is a lightweight (1kb compressed) library that provides tools for theming.

Unlike other libraries implementing the sx property, themebox is fully typed.  
Here is an exemple

https://user-images.githubusercontent.com/3781663/199988034-7f4b5e8e-2217-4634-9ab4-9de8740d93c2.mov


## Installation

```
npm install themebox
---
yarn add themebox
```

## Usage

### Basic

```javascript
const theme = {
  ...defaultTheme,
  colors: {
    $primary: '#234234',
  },
};

const Exemple = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bg: '$primary', m: 10 }}>Content</Box>
    </ThemeProvider>
  );
};
```

## Theming

Themebox provides a powerful theming feature.  
The default theme includes spaces and breakpoints.

```javascript
import { defaultTheme } from 'themebox';

const theme = {
  ...defaultTheme,
  colors: {
    $primary: '#234234',
    $secondary: '#456456',
  },
  shadows: {
    $1: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
    $2: '0 2px 8px 0px rgba(0, 0, 0, 0.13)',
    $3: '0 2px 12px 1px rgba(0, 0, 0, 0.10)',
  },
};

const App = () => {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
};
```

## Generic components

A generic component is a design components reusable and easily customisable with the sx property overriding.  
Let's create a generic Button !

```typescript
// Button.tsx

type Button = GenericComponent<
  'div',
  {
    children?: React.ReactNode;
  }
>;

const Button: Button = ({ children, sx, ...props }) => {
  return (
    <Box sx={[{ bg: 'green', px: 4, py: 2 }, sx]} {...props}>
      {children}
    </Box>
  );
};
```

```typescript
// Page.tsx

import Button from './Button.tsx';

const Page = () => {
  return (
    <div>
      <Button onClick=() => {console.log('hey!')}>Button</Button>

      // Generic components allows additional style with the sx prop
      <Button sx={{mt: 4}}>Custom Button</Button>
    </div>
  );
};
```
