import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

export default baseConfig({
  mode: 'production',
  output: {
    path: path.join(__dirname, '../build/firefox'),
    publicPath: '.', // No remote URL with Firefox
  },
  rules: [
    {
      test: /lib\/heap/,
      use: [{ loader: 'null-loader'}],
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
        LMEM_SCRIPTS_ORIGIN: '\'.\'', // Use local build
        ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
        REFRESH_MC_INTERVAL: '10*60*1000',
        // No analytics with Firefox
        // HEAP_APPID: '"3705584166"',
      }
    })
  ],
});
