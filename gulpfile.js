/*
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var bulkSass = require('gulp-sass-glob-import');
var del = require('del');
var connect = require('gulp-connect');
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");


// destinations
var fonts_dest = './dist/fonts/';
var fonts_docs_dest = './docs/fonts/';

var html_dest = './docs/';

var css_dest = './dist/css/';
var css_docs_dest = './docs/css/';

var js_build_dest = './js/dist/';
var js_bundle_dest = './dist/js/';
var js_bundle_name = 'fluid-bootstrap.js';
var js_docs_dest = './docs/js/';


// sources
var fonts_src = './node_modules/font-awesome/fonts/fontawesome-webfont.*';

var html_src = './*.html';

var sass_src = [
  './scss/**/*.scss',
  './node_modules/font-awesome/scss/*.scss'
];
var sass_docs_src = './demo.scss';

var js_build_src = './js/src/*.js';
var js_bundle_src = [
  './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
  './js/dist/*.js'
];
var js_minify_src = js_bundle_dest + js_bundle_name;
var js_docs_src = './demo.js';


// tasks
gulp.task('copy-fonts', () =>
  gulp.src(fonts_src)
    .pipe(gulp.dest(fonts_dest))
    .pipe(gulp.dest(fonts_docs_dest))
    .pipe(connect.reload())
);

gulp.task('copy-html', () =>
  gulp.src(html_src)
    .pipe(gulp.dest(html_dest))
    .pipe(connect.reload())
);

gulp.task('build-sass', () =>
  gulp.src(sass_src)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css_dest))
    .pipe(gulp.dest(css_docs_dest))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css_dest))
    .pipe(gulp.dest(css_docs_dest))
    .pipe(connect.reload())
);

gulp.task('build-docs-sass', () =>
  gulp.src(sass_docs_src)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(css_docs_dest))
    .pipe(connect.reload())
);

gulp.task('transpile-js', () =>
  gulp.src(js_build_src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_build_dest))
);

gulp.task('bundle-js', () =>
  gulp.src(js_bundle_src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat(js_bundle_name))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_bundle_dest))
    .pipe(gulp.dest(js_docs_dest))
);

gulp.task('minify-js', () =>
  gulp.src(js_minify_src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_bundle_dest))
);

gulp.task('build-js', gulp.series('transpile-js', 'bundle-js', 'minify-js', connect.reload));

gulp.task('build-docs-js', () =>
  gulp.src(js_docs_src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(js_docs_dest))
    .pipe(connect.reload())
);

gulp.task('clean', () => del(['./dist', './docs', js_build_dest]));

gulp.task('build', gulp.series('copy-fonts', 'copy-html', 'build-sass', 'build-docs-sass', 'build-js', 'bundle-js', 'build-docs-js'));

gulp.task('watch-fonts', () => gulp.watch(fonts_src, { ignoreInitial: false }, gulp.series('copy-fonts')));
gulp.task('watch-html', () => gulp.watch(html_src, { ignoreInitial: false }, gulp.series('copy-html')));
gulp.task('watch-sass', () => gulp.watch(sass_src, { ignoreInitial: false }, gulp.series('build-sass')));
gulp.task('watch-docs-sass', () => gulp.watch(sass_docs_src, { ignoreInitial: false }, gulp.series('build-docs-sass')));
gulp.task('watch-js', () => gulp.watch(js_build_src, { ignoreInitial: false }, gulp.series('build-js', 'bundle-js')));
gulp.task('watch-docs-js', () => gulp.watch(js_docs_src, { ignoreInitial: false }, gulp.series('build-docs-js')));

gulp.task('watch', gulp.parallel('watch-fonts', 'watch-html', 'watch-sass', 'watch-docs-sass', 'watch-js', 'watch-docs-js'));

gulp.task('connect', () => connect.server({
    root: 'docs',
    port: 8000,
    livereload: true
  })
);

gulp.task('default', gulp.parallel('watch', 'connect'));
