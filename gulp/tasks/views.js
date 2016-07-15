import gulp from 'gulp';
import jade from 'gulp-jade';

import devConfig from '../../webpack/dev.config';
import extConfig from '../../webpack/extension.config';
import appConfig from '../../webpack/app.config';
import electronConfig from '../../webpack/electron.config';
import webConfig from '../../webpack/web.config';
import cordovaConfig from '../../webpack/cordova.config';

const paths = ['./src/browser/views/*.jade', './src/views/*.jade'];

const compile = (dest, path, config = {}, env = 'prod') => () => {
  gulp.src(path)
    .pipe(jade({
      locals: { config, env }
    }))
    .pipe(gulp.dest(dest));
};

gulp.task('views:build:dev', compile('./dev', paths, devConfig, 'dev'));
gulp.task('views:build:extension', compile('./build/extension', paths[0], extConfig));
gulp.task('views:build:app', () => {
  compile('./build/app', paths[1], appConfig)();
  compile('./build/app', './src/browser/views/background.jade', appConfig)();
});
gulp.task('views:build:electron', compile('./build/electron', paths[1], electronConfig));
gulp.task('views:build:web', compile('./build/web', paths[1], webConfig));
gulp.task('views:build:cordova', compile('./www', paths[1], webConfig));
gulp.task('views:watch', () => {
  gulp.watch(paths, ['views:dev']);
});
