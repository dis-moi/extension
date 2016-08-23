import gulp from 'gulp';
import rename from 'gulp-rename';

const copy = (dest, manifest, tests) => () => {
  if (manifest) {
    gulp.src(`./src/${manifest}`)
      .pipe(rename('manifest.json'))
      .pipe(gulp.dest(dest));
  }
  gulp.src('./src/assets/**/*').pipe(gulp.dest(dest));
  gulp.src('./src/app/lmem/draft-preview/grabDraftRecommandations.js')
    .pipe(gulp.dest(dest+'/js'));

  if(tests){
    gulp.src('./test/**/*').pipe(gulp.dest(dest+'/test'));
  }
};

const manifestDevSource = 'browser/extension/manifest.dev.json';

gulp.task('copy:build:dev', copy('./build/dev', manifestDevSource, true));
gulp.task('copy:build:staging',
  copy('./build/staging', 'browser/extension/manifest.staging.json'));
gulp.task('copy:build:production',
  copy('./build/production', 'browser/extension/manifest.prod.json'));

gulp.task('copy:watch', () => {
  gulp.watch(`./src/${manifestDevSource}`, ['copy:build:dev']);
});