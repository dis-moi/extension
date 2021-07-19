/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  if (stage !== 'develop') {
    return;
  }
  actions.setWebpackConfig({
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        eslint: true, // undefined in CRA
        reportFiles: [
          'src/**/*.{ts,tsx}',
          '!**/test/**',
          '!**/?(*.)(spec|test).*',
          '!src/assets/**',
          '!**/node_modules/**'
        ],
        silent: false, // true in CRA
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      })
    ]
  });
};
