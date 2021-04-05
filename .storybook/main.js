const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register'
  ],
  typescript: {
    check: false,
    checkOptions: {
      checkSyntacticErrors: true,
      eslint: true,
      reportFiles: [
        'src/**/*.{ts,tsx}',
        '!**/test/**',
        '!**/?(*.)(spec|test).*'
      ],
      silent: false,
      useTypescriptIncrementalApi: true,
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json')
    }
  }
};
