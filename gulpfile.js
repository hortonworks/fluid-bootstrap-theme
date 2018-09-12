/*
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  bulkSass = require('gulp-sass-glob-import'),
  del = require('del'),
  connect = require('gulp-connect');

gulp.task('copy-html', () =>
  gulp.src(['./*.html'])
    // .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./docs/'))
    .pipe(connect.reload())
);

gulp.task('copy-fonts', () =>
  gulp.src(['./src/fonts/**/*', './node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('./dist/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
    .pipe(connect.reload())
);

gulp.task('build-sass', () =>
  gulp.src(['./src/**/*.scss', './node_modules/font-awesome/scss/*.scss'])
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(connect.reload())
);

gulp.task('clean', () => del(['./dist']));

gulp.task('build', gulp.series('build-sass', 'copy-fonts', 'copy-html'));
gulp.task('build', gulp.series('build-sass', 'copy-fonts', 'copy-html'));

gulp.task('watch-sass', () => gulp.watch(['./src/**/*.scss'], gulp.series('build-sass')));
gulp.task('watch-fonts', () => gulp.watch(['./src/fonts/**/*'], gulp.series('copy-fonts')));
gulp.task('watch-html', () => gulp.watch(['./*.html'], gulp.series('copy-html')));

gulp.task('watch', gulp.parallel('watch-sass', 'watch-fonts', 'watch-html'));

gulp.task('connect', () => connect.server({
    root: 'docs',
    port: 8000,
    livereload: true
  })
);

gulp.task('default', gulp.parallel('watch', 'connect'));
