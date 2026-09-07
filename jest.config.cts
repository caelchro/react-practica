// import type { Config } from 'jest';

// const config: Config = {
//     testEnvironment: 'jsdom',
//     transform: {
//         '^.+\\.(ts|tsx)$': 'babel-jest',
//     },
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };

// export default config;

module.exports = {
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};