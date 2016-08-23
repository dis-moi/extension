import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp/tasks');

gulp.task('default',['build:dev']);
gulp.task('build:dev',
  ['webpack:build:dev', 'views:build:dev', 'copy:build:dev', 'copy:watch']);
gulp.task('build:staging',
  ['webpack:build:staging', 'views:build:staging', 'copy:build:staging']);
gulp.task('build:production',
  ['webpack:build:production', 'views:build:production', 'copy:build:production']);
gulp.task('test-chrome', ['chrome:test']);
gulp.task('deploy:extension', ['build:production', 'sftp:deploy:extension']);
