var common = [
  `--format ${
    process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
  }`,
  '--parallel 20',
  '--require-module ts-node/register ',
  '--require-module tsconfig-paths/register ',
  '--require test/e2e/support/*.ts',
  '--require test/e2e/step_definitions/*.ts',
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common
};
