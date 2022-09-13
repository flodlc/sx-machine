import { css } from './css';

test('empty object', () => {
  expect(css({ theme: {} })({})).toEqual({});
});

test('deep scales', () => {
  expect(
    css({
      theme: {
        colors: { primary: '#444444' },
        spaces: Object.fromEntries(
          new Array(120).fill(0).map((it, i) => [i - 59, `${(i - 59) / 4}rem`])
        ),
      },
    })({
      padding: -1,
    })
  ).toEqual({
    padding: '-0.25rem',
  });
});

test('deep scales', () => {
  expect(
    css({
      theme: {
        colors: { primary: '#444444' },
        spaces: Object.fromEntries(
          new Array(120).fill(0).map((it, i) => [i - 59, `${(i - 59) / 4}rem`])
        ),
      },
    })({
      mx: 5,
      bg: 'primary',
      paddingX: 2,
      '> div': { color: 'primary', paddingX: 10 },
      '> span': { padding: 1 },
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
