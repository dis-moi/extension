import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';

import devConfig from '../../webpack/dev.config';
import stagingConfig from '../../webpack/staging.config';
import extConfig from '../../webpack/production.config';

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
gulp.task('webpack:build:staging', (callback) => {
  build(stagingConfig, callback);
});
gulp.task('webpack:build:production', (callback) => {
  build(extConfig, callback);
});