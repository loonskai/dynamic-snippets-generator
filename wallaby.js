module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts'],
    tests: ['__tests__/**/*test.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
      }),
    },
    testFramework: 'jest',
  };
};
