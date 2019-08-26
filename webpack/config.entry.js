const path = require('path');

module.exports = (env, srcPath) => ({
  background: ['@babel/polyfill', path.join(srcPath, './app/background/')],
  content: ['@babel/polyfill', path.join(srcPath, './app/content/')],
  settings: ['@babel/polyfill', path.join(srcPath, './app/settings/')]
});
