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

var fonts_src = './node_modules/font-awesome/fonts/fontawesome-webfont.*';
var sass_src = ['./src/**/*.scss', './node_modules/font-awesome/scss/*.scss'];
var sass_docs_src = ['./docs/scss/*.scss'];
var html_src = './*.html';
var js_src = './application.js';

gulp.task('copy-html', () =>
  gulp.src(html_src)
    .pipe(gulp.dest('./docs/'))
    .pipe(connect.reload())
);

gulp.task('copy-js', () =>
  gulp.src(js_src)
    .pipe(gulp.dest('./docs/js'))
    .pipe(connect.reload())
);

gulp.task('copy-fonts', () =>
  gulp.src(fonts_src)
    .pipe(gulp.dest('./dist/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
    .pipe(connect.reload())
);

gulp.task('build-sass', () =>
  gulp.src(sass_src)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(connect.reload())
);

gulp.task('build-docs-sass', () =>
  gulp.src(sass_docs_src)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(connect.reload())
);

gulp.task('clean', () => del(['./dist']));

gulp.task('build', gulp.series('build-sass', 'build-docs-sass', 'copy-fonts', 'copy-html', 'copy-js'));

gulp.task('watch-sass', () => gulp.watch(sass_src, { ignoreInitial: false }, gulp.series('build-sass')));
gulp.task('watch-docs-sass', () => gulp.watch(sass_docs_src, { ignoreInitial: false }, gulp.series('build-docs-sass')));
gulp.task('watch-fonts', () => gulp.watch(fonts_src, { ignoreInitial: false }, gulp.series('copy-fonts')));
gulp.task('watch-html', () => gulp.watch(html_src, { ignoreInitial: false }, gulp.series('copy-html')));
gulp.task('watch-js', () => gulp.watch(js_src, { ignoreInitial: false }, gulp.series('copy-js')));

gulp.task('watch', gulp.parallel('watch-sass', 'watch-docs-sass', 'watch-fonts', 'watch-html', 'watch-js'));

gulp.task('connect', () => connect.server({
    root: 'docs',
    port: 8000,
    livereload: true
  })
);

gulp.task('default', gulp.parallel('watch', 'connect'));
