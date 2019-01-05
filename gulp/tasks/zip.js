import gulp from 'gulp';
import path from 'path';
import zip from 'gulp-zip';

import { output as chromiumOutput } from '../../webpack/chromium.config';
import { output as firefoxOutput } from '../../webpack/firefox.config';
import { output as stagingOutput } from '../../webpack/staging.config';

const { path: chromiumPath } = chromiumOutput;
const { path: firefoxPath } = firefoxOutput;
const { path: stagingPath } = stagingOutput;

const version = process.env.npm_package_version;

gulp.task('zip:build:firefox',
  ['webpack:build:firefox', 'copy:build:firefox'], () =>
    gulp.src(firefoxPath + '/**/*')
      .pipe(zip(`lmem-v${version}-firefox.zip`))
      .pipe(gulp.dest(path.join(firefoxPath, '../'))));

gulp.task('zip:build:chromium',
  ['webpack:build:chromium', 'copy:build:chromium'], () =>
    gulp.src(chromiumPath + '/**/*')
      .pipe(zip(`lmem-v${version}-chromium.zip`))
      .pipe(gulp.dest(path.join(chromiumPath, '../'))));

gulp.task('zip:build:staging',
  ['webpack:build:staging', 'copy:build:staging'], () =>
    gulp.src(stagingPath + '/**/*')
      .pipe(zip(`lmem-v${version}-staging.zip`))
      .pipe(gulp.dest(path.join(stagingPath, '../'))));
