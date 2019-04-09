const path = require('path');

module.exports = (env, outputBase) => {
  switch (env.build) {
    case 'dev': path.resolve(outputBase, 'dev')
  }
};
