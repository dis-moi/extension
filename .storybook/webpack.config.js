const path = require("path");
const rules = require("../webpack/config.rules");

const env = { build: 'dev'};

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules = rules(env, 'development');
  storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");
  storybookBaseConfig.resolve.modules.push(
    path.resolve(__dirname, "..", "src")
  );
  storybookBaseConfig.stats = require("../webpack/config.stats");
  return storybookBaseConfig;
};
