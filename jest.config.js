/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};