import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp/tasks');

gulp.task('default',['build:dev']);
gulp.task('build:dev',
  ['webpack:build:dev', 'views:build:dev', 'copy:build:dev',
    'copy:watch', 'webpack:watch']);

gulp.task('build:chromium-staging',
  ['webpack:build:staging', 'views:build:staging', 'copy:build:staging', 'zip:build:staging']);

gulp.task('build:chromium-production',
  ['webpack:build:chromium', 'views:build:chromium', 'copy:build:chromium', 'zip:build:chromium']);

gulp.task('build:firefox-production',
  ['webpack:build:firefox', 'views:build:firefox', 'copy:build:firefox', 'zip:build:firefox']);

gulp.task('build:production', ['build:firefox-production', 'build:chromium-production']);
gulp.task('build:staging', ['build:chromium-staging']);

gulp.task('test-chrome', ['chrome:test']);
