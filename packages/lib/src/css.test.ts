import { css } from './css';
import { defaultTheme } from './theme';

test('empty object', () => {
  expect(css({ theme: { ...defaultTheme } })({})).toEqual({});
});

test('deep scales', () => {
  expect(
    css({
      theme: {
        ...defaultTheme,
        colors: { $primary: '#444444' },
      },
    })({
      padding: '$-1',
    })
  ).toEqual({
    padding: '-0.25rem',
  });
});

test('deep scales', () => {
  expect(
    css({
      theme: {
        ...defaultTheme,
        colors: { $primary: '#444444' },
      },
    })({
      mx: '$5',
      background: '$primary',
      paddingX: '$2',
      '> div': { color: '$primary', paddingX: '$10' },
      '> span': { padding: '$1' },
    })
  ).toEqual({
    marginLeft: '1.25rem',
    marginRight: '1.25rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    background: '#444444',
    '> div': {
      color: '#444444',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
    '> span': { padding: '0.25rem' },
  });
});
