const path = require('path');

module.exports = (env, srcPath) => ({
  background: ['@babel/polyfill', path.join(srcPath, './app/background/')],
  content: ['@babel/polyfill', path.join(srcPath, './app/content/')],
  ...(
    env.build === 'dev' || env.build === 'staging'
      ? {test: [path.join(__dirname, '../test/integration/')]}
      : {}
  )
});
