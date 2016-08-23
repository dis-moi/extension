import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';

import devConfig from '../../webpack/dev.config';
import extConfig from '../../webpack/extension.config';

const build = (config, callback) => {
  let myConfig = Object.create(config);
  webpack(myConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({ colors: true }));
    callback();
  });
};

gulp.task('webpack:build:dev', (callback) => {
  build(devConfig, callback);
});
gulp.task('webpack:build:extension', (callback) => {
  build(extConfig, callback);
});