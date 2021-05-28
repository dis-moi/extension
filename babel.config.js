module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      'react-app',
      {
        flow: false,
        typescript: true
      }
    ]
  ];
  const plugins = ['babel-plugin-styled-components'];

  return {
    presets,
    plugins
  };
};
