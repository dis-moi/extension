import gulp from 'gulp';
import jade from 'gulp-jade';

import devConfig from '../../webpack/dev.config';
import stagingConfig from '../../webpack/staging.config';
import extConfig from '../../webpack/chromium.config';
import firefoxConfig from '../../webpack/firefox.config';


const paths = ['./views/*.jade'];

const compile = (dest, path, config = {}, env = 'prod') => () => {
  gulp.src(path)
    .pipe(jade({
      locals: { config, env }
    }))
    .pipe(gulp.dest(dest));
};

gulp.task('views:build:dev', compile('./build/dev', paths, devConfig, 'dev'));
gulp.task('views:build:staging', compile('./build/staging', paths[0], stagingConfig));
gulp.task('views:build:chromium', compile('./build/chromium', paths[0], extConfig));
gulp.task('views:build:firefox', compile('./build/firefox', paths[0], firefoxConfig));

gulp.task('views:watch', () => {
  gulp.watch(paths, ['views:dev']);
});
