import gulp from 'gulp';
import jade from 'gulp-jade';

import devConfig from '../../webpack/dev.config';
import extConfig from '../../webpack/extension.config';


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

gulp.task('views:watch', () => {
  gulp.watch(paths, ['views:dev']);
});
