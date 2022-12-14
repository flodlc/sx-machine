<h1 align="center">Sx-machine</h1>
<p align="center">First class Sx property for React.</p>

## Sx-machine is a lightweight library that provides a Box component for React and its themed SX property.

### Main features

- Box component for React
- Sx property with first class typescript support
- Highly customizable theme provider
- Reusable components factory
- Style caching for high performances
<hr>

#### Here is an exemple of usage

https://user-images.githubusercontent.com/3781663/199988034-7f4b5e8e-2217-4634-9ab4-9de8740d93c2.mov

## Installation

```
npm install sx-machine
---
yarn add sx-machine
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

Sx-machine provides a powerful theming feature.  
The default theme includes spaces and breakpoints.

> ### $ prefix
>
> It's recommanded to use $ prefixed theme keys to help differenciate theme values from native CSS values

```javascript
import { defaultTheme } from 'sx-machine';

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

## The `as` attribute

The Box Component is the primitive component that allows you to access the sx property. By default it renders a div html element.  
It accepts a `as` attribute to choose the needed tag.

```javascript
<Box as="a" href="#" sx={{ color: '$primary' }}>
  My link
</Box>
```

> Of course, the href attribute type is well inferred from the "`a`" tag.  
> And it works for all tags and Components !

## Reusable components

Components often need to be reusable and easily customisable with the sx property overriding.  
Let's create a reusable Button !

```javascript
// Button.tsx
import { createSxComponent } from 'sx-machine';

const Button: Button = createSxComponent<'div',
  {
    children?: React.ReactNode,
  }>(({ children, sx, ...props }) => {
  return (
    <Box sx={[{ bg: 'green', px: 4, py: 2 }, sx]} {...props}>
      {children}
    </Box>
  );
});
```

```javascript
// Page.tsx

import Button from './Button.tsx';

const Page = () => {
  return (
    <div>
      <Button onClick=() => {console.log('hey!')}>Button</Button>

      // Reusable components allows additional style with the sx prop
      <Button sx={{mt: 4}}>Custom Button</Button>
    </div>
  );
};
```
