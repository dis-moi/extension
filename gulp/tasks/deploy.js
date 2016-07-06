import gulp from 'gulp';
import gutil from 'gulp-util';
import sftp from 'gulp-sftp';

import extConfig from '../../webpack/extension.config';

gulp.task('sftp:deploy:extension', function () {
    gulp.src(extConfig.output.path + '/**/*')
        .pipe(sftp(extConfig.output.sftp));
});
