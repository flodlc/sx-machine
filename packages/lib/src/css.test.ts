import { css } from './css';

test('empty object', () => {
  expect(css({ theme: {}, SCALES: {} })({})).toEqual({});
});

test('deep scales', () => {
  expect(
    css({
      theme: {
        colors: { primary: '#444444' },
      },
      SCALES: {
        paddingY: {
          transform: (value: number) => ({
            paddingLeft: value,
            paddingRight: value,
          }),
        },
      },
    })({
      margin: 5,
      paddingY: 2,
      '> div': { color: 'colors.primary', paddingY: 10 },
    })
  ).toEqual({
    margin: 5,
    paddingLeft: 2,
    paddingRight: 2,
    '> div': { color: '#444444', paddingLeft: 10, paddingRight: 10 },
  });
});
