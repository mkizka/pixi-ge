module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment'
}
