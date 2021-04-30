const path = require('path');
const rules = require('../webpack/config.rules');
const basePlugins = require('../webpack/config.plugins.base');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const env = { build: 'dev' };
const argv = {
  mode: 'development',
  watch: true
};

module.exports = ({ config }) => {
  config.module.rules = rules(env, argv);
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(png|jpe?g|gif|mp4)$/i,
      loader: 'file-loader',
      options: {
        publicPath: process.env.PROFILES_ASSETS_PATH,
        name: '[path][name].[ext]',
        context: 'src/assets'
      }
    },
    {
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})]
          }
        }
      ]
    },
    {
      // 2b. Run `source-loader` on story files to show their source code
      //     automatically in `DocsPage` or the `Source` doc block.

      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre'
    }
  ];
  config.resolve.modules.push(path.resolve(__dirname, '..', 'src'));
  config.resolve.alias.test = path.resolve(__dirname, '..', 'test');
  const basePluginsArray = basePlugins(env, 'development');
  config.plugins.push(...basePluginsArray);
  config.stats = require('../webpack/config.stats');
  return config;
};
