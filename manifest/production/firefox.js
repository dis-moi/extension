const base = require('../base');

module.exports = () => {
  const baseManifest = base();
  return {
    ...baseManifest,
    permissions: [...baseManifest.permissions, '*://*/*']
  };
};
