import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp/tasks');

gulp.task('default', ['replace-webpack-code', 'webpack-dev-server', 'views:dev', 'copy:dev']);
gulp.task('build:web', ['webpack:build:web', 'views:build:web', 'copy:build:web']);
gulp.task('build:electron',
  ['webpack:build:electron', 'views:build:electron', 'copy:build:electron']);
gulp.task('build:extension',
  ['webpack:build:extension', 'views:build:extension', 'copy:build:extension']);
gulp.task('build:app', ['webpack:build:app', 'views:build:app', 'copy:build:app']);
gulp.task('build:firefox', ['copy:build:firefox']);
gulp.task('test-app', ['app:test']);
gulp.task('test-chrome', ['chrome:test']);
