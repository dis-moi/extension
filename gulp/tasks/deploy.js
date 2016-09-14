import gulp from 'gulp';
import gutil from 'gulp-util';
import sftp from 'gulp-sftp';

import prodConfig from '../../webpack/production.config';
import stagingConfig from '../../webpack/staging.config';

gulp.task('sftp:deploy:production', function () {
    gulp.src(prodConfig.output.path + '/**/*')
        .pipe(sftp(prodConfig.output.sftp));
});

gulp.task('sftp:deploy:staging', function () {
    gulp.src(stagingConfig.output.path + '/**/*')
        .pipe(sftp(stagingConfig.output.sftp));
});
