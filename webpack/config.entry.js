const path = require('path');

const polyfills = ['core-js/stable', 'regenerator-runtime/runtime'];

module.exports = (env, srcPath) => ({
  background: [...polyfills, path.join(srcPath, './app/background/')],
  content: [...polyfills, path.join(srcPath, './app/content/')],
  options: [...polyfills, path.join(srcPath, './app/options/')],
  // profiles: [...polyfills, path.join(srcPath, './app/profiles/')]
});
