const path = require("path");

module.exports = (env, mode) => {
  const rules = [
    {
      test: /\.tsx?$/,
      loader: require.resolve("awesome-typescript-loader")
    },
    {
      test: /\.jsx?$/,
      loader: require.resolve("babel-loader"),
      include: [
        path.resolve(__dirname, "..", "src"),
        path.resolve(__dirname, "..", ".storybook")
      ]
    },
    {
      test: /\.css$/,
      use: [{ loader: "style-loader" }, { loader: "css-loader" }]
    },
    {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: "url-loader"
    },
    {
      test: /\.svg/,
      include: [
        path.resolve(__dirname, '../src/')
      ],
      loader: 'svg-url-loader',
    },
    {
      test: /\.(jade|pug)$/,
      use: {
        loader: 'pug-loader',
        options: {
          pretty: mode === 'development',
        }
      },
      include: [ path.resolve(__dirname, '../views/') ],
    }
  ];

  if (env.build === 'firefox') {
    rules.push({
      test: /lib\/heap/,
      use: [{ loader: 'null-loader'}],
    })
  }

  return rules;
};
