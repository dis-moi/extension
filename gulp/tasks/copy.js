import gulp from 'gulp';
import file from 'gulp-file';

import devManifest from '../../src/browser/extension/manifest/dev';
import prodManifest from '../../src/browser/extension/manifest/prod';
import stagingManifest from '../../src/browser/extension/manifest/staging';

const copy = (dest, manifestStr, tests) => () => {
  if (manifestStr) {
    file('manifest.json', manifestStr, { src: true })
      .pipe(gulp.dest(dest));
  }
  gulp.src('./src/assets/**/*').pipe(gulp.dest(dest));
  gulp.src('./src/app/lmem/draft-preview/grabDraftRecommendations.js')
    .pipe(gulp.dest(dest+'/js'));

  if(tests){
    gulp.src('./test/**/*').pipe(gulp.dest(dest+'/test'));
  }
};


gulp.task('copy:build:dev',
  copy('./build/dev', JSON.stringify(devManifest, null, 2), true));
gulp.task('copy:build:staging',
  copy('./build/staging', JSON.stringify(stagingManifest, null, 2)));
gulp.task('copy:build:production',
  copy('./build/production', JSON.stringify(prodManifest, null, 2)));

gulp.task('copy:watch', () => {
  gulp.watch(`./src/browser/extension/manifest`, ['copy:build:dev']);
});