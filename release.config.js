const { DEPLOY } = process.env;

const getLogger = require('semantic-release/lib/get-logger');

const logger = getLogger({
  cwd: process.cwd(),
  env: process.env,
  stdout: process.stdout,
  stderr: process.stderr
});

const configFilePath = `./release.config.${DEPLOY}.js`;

logger.log(`Loading config file ${configFilePath}`);

module.exports = require(configFilePath);
