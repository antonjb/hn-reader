module.exports = {
    preset: 'ts-jest',
    setupFiles: ['./fetchpolyfill.js'],
    setupFilesAfterEnv: ['./test-setup.ts'],
    testEnvironment: 'jsdom',
}
