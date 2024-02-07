module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', 'src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};