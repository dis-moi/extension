import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack/dev.config';

gulp.task('webpack-dev-server', () => {
  const compiler = webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
  });
  new WebpackDevServer(compiler, {
    contentBase: './dev',
    publicPath: config.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    historyApiFallback: true
  }).listen(config.output.port, config.output.host, (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', `listening at ${config.output.port}`);
  });
  webpackHotMiddleware(compiler);
});
