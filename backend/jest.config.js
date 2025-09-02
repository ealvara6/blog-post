const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  // If you use ES modules in Node 20+, uncomment:
  // extensionsToTreatAsEsm: ['.ts'],
  // globals: { 'ts-jest': { useESM: true } },
  // moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }, // if you use path aliases
};
export default config;
