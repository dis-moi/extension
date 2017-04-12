import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import path from 'path';

import devConfig from '../../webpack/dev.config';
import stagingConfig from '../../webpack/staging.config';
import extConfig from '../../webpack/production.config';

function compiler(config) {
  return webpack(Object.create(config));
}

function staticCompiler(config) {
  if (!staticCompiler.instance) {
    staticCompiler.instance = compiler(config);
  }
  return staticCompiler.instance;
}

function build(compiler, callback) {
  compiler.run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      chunks: false,
      colors: true,
    }));
    callback();
  });
}

gulp.task('webpack:watch', () => {
  const globs = [
    path.join(__dirname, '../../src/') + '**/*',
    path.join(__dirname, '../../test/') + '**/*'
  ];
  return gulp.watch(globs, ['webpack:build:dev']);
});
gulp.task('webpack:build:dev', (callback) => {
  // Instance webpack compiler once over multiple times (watch)
  build(staticCompiler(devConfig), callback);
});
gulp.task('webpack:build:staging', (callback) => {
  build(compiler(stagingConfig), callback);
});
gulp.task('webpack:build:production', (callback) => {
  build(compiler(extConfig), callback);
});