import path from 'path';
import baseConfig from './base.config';

export default baseConfig({
  input: {
    test: [path.join(__dirname, '../test/integration/')],
  },
  output: {
    path: path.join(__dirname, '../build/dev'),
    publicPath: '.'
  },
  globals: {
    'process.env': {
      NODE_ENV: '"development"',
      LMEM_BACKEND_ORIGIN: '"https://staging-recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'", // Use local build
      // REFRESH_MC_INTERVAL: '1*60*1000', // Uncomment to enable auto-refresh
    }
  }
});
