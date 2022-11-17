/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testEnvironment: 'node',
};
