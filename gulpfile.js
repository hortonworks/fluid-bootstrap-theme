/*
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  bulkSass = require('gulp-sass-glob-import'),
  del = require('del'),
  server = require('gulp-server-livereload');

gulp.task('copy-html', () => {
  return gulp.src(['./*.html'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-fonts', () => {
  return gulp.src(['./src/fonts/**/*', './node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('build-sass', () => {
  return gulp.src(['./src/scss/**/*.scss', './node_modules/font-awesome/scss/*.scss'])
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('clean', () => {
  return del(['./dist']);
});

gulp.task('watch', ['default'], () => {
  gulp.watch(['./src/scss/**/*.scss'], ['build-sass']);
  gulp.watch(['./src/fonts/**/*'], ['copy-fonts']);
  gulp.watch(['./src/*.html'], ['copy-html']);
});

gulp.task('serve', ['watch'], () => {
  gulp.src('./dist/')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['build-sass', 'copy-fonts', 'copy-html'], () => {});
