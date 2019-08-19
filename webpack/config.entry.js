const path = require('path');

module.exports = (env, srcPath) => ({
  background: [path.join(srcPath, './app/background/')],
  content: [path.join(srcPath, './app/content/')]
});
