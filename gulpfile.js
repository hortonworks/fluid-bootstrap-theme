/*
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const atImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const bulkSass = require('gulp-sass-glob-import');
const del = require('del');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const styleLint = require('gulp-stylelint');

// Helpers
// Task Arguments
// Created an args object with key/value pairs sent to a task as flags
// command: gulp task1 --a 123 --b "my string" --c --d false
// args: { "a": "123", "b": "my string", "c": true , "b": false}
const args = (argList => {
  let args = {}, a, opt, thisOpt, curOpt;

  // loops through the process.argv array
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    // any argList value preceded with one or more dashes results in a new key in the args object
    // argList values without dashes are set as values for the previous key in the args object
    if (opt === thisOpt) {
      // argument value
      if (curOpt)
        // simple switch to parse boolean values if encountered
        switch (opt) {
          case 'true':  args[curOpt] = true; break;
          case 'false': args[curOpt] = false; break;
          default:      args[curOpt] = opt;
        }

      curOpt = null;
    } else {
      curOpt = opt;
      // an argList value preceded with one or more dahses defaults to true
      args[curOpt] = true;
    }
  }

  return args;
})(process.argv);

// roots
const dist = './dist';
const docs = '../gh-pages';

// destinations
const fonts_dest = `${dist}/font/`;
const fonts_docs_dest = `${docs}/font/`;

const images_dest = `${docs}/images/`;

const html_dest = `${docs}/`;

const css_dest = `${dist}/css/`;
const css_docs_dest = `${docs}/css/`;

const js_build_dest = './js/dist/';
const js_bundle_dest = `${dist}/js/`;
const js_bundle_name = 'fluid-bootstrap.js';
const js_docs_dest = `${docs}/js/`;

// sources
const fonts_src = './icons/font/*.*';

const images_src = './images/*.*';

const html_src = './*.html';

const sass_lint_src = [
  './scss/_functions.scss',
  './scss/components/*',
  './scss/mixins/*',
  './scss/utilities/*',
];
const sass_src = [
  './scss/_fluid-bootstrap.scss'
];
if (!args.nodeps) {
  sass_src.push('./scss/_fluid-bootstrap-deps.scss');
}

const css_src = [
  css_dest + '*.css',
  '!' + css_dest + '*.min.css'
];
const sass_docs_src = './demo.scss';

const js_transpile_src = './js/src/*.js';

const js_deps = [
  './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
  './node_modules/bootstrap-select/dist/js/bootstrap-select.js'
];

let js_bundle_src = [];
if (!args.nodeps) {
  js_bundle_src = js_deps;
}
js_bundle_src.push(js_build_dest + '*.js');

const js_minify_src = js_bundle_dest + js_bundle_name;
const js_docs_src = './demo.js';

// tasks
gulp.task('copy-fonts', () =>
  gulp.src(fonts_src)
    .pipe(gulp.dest(fonts_dest))
    .pipe(gulp.dest(fonts_docs_dest))
    .pipe(connect.reload())
);

gulp.task('copy-images', () =>
  gulp.src(images_src)
    .pipe(gulp.dest(images_dest))
    .pipe(connect.reload())
);

gulp.task('copy-html', () =>
  gulp.src(html_src)
    .pipe(gulp.dest(html_dest))
    .pipe(connect.reload())
);

gulp.task('lint-sass', () =>
  gulp.src(sass_lint_src)
    .pipe(styleLint({
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }))
);

gulp.task('transpile-sass', () =>
  gulp.src(sass_src)
    .pipe(concat('fluid-bootstrap.scss'))
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([atImport(), autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12'] })]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css_dest))
    .pipe(gulp.dest(css_docs_dest))
);

gulp.task('minify-css', () =>
  gulp.src(css_src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css_dest))
    .pipe(gulp.dest(css_docs_dest))
    .pipe(connect.reload())
);

gulp.task('build-sass', gulp.series('transpile-sass', 'minify-css'));

gulp.task('build-docs-sass', () =>
  gulp.src(sass_docs_src)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([atImport(), autoprefixer({ browsers: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12'] })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(css_docs_dest))
    .pipe(connect.reload())
);

gulp.task('transpile-js', () =>
  gulp.src(js_transpile_src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_build_dest))
);

gulp.task('bundle-js', () =>
  gulp.src(js_bundle_src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(concat(js_bundle_name))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_bundle_dest))
    .pipe(gulp.dest(js_docs_dest))
);

gulp.task('minify-js', () =>
  gulp.src(js_minify_src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js_bundle_dest))
    .pipe(connect.reload())
);

gulp.task('build-js', gulp.series('transpile-js', 'bundle-js', 'minify-js'));

gulp.task('build-docs-js', () =>
  gulp.src(js_docs_src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(js_docs_dest))
    .pipe(connect.reload())
);

gulp.task('clean', () => del([dist, `${docs}/*/**`, `${docs}/*`, js_build_dest], { force: true }));

gulp.task('test', gulp.parallel('lint-sass'));

gulp.task('build', gulp.parallel('copy-fonts', 'copy-html', 'build-sass', 'build-docs-sass', 'build-js', 'build-docs-js'));

gulp.task('connect', done => {
  connect.server({
    root: docs,
    port: 8000,
    livereload: true
  });

  done();
});

gulp.task('watch-fonts', () => gulp.watch(fonts_src, { ignoreInitial: false }, gulp.series('copy-fonts')));
gulp.task('watch-images', () => gulp.watch(images_src, { ignoreInitial: false }, gulp.series('copy-images')));
gulp.task('watch-html', () => gulp.watch(html_src, { ignoreInitial: false }, gulp.series('copy-html')));
gulp.task('watch-sass', () => gulp.watch('./scss/**/*.scss', { ignoreInitial: false }, gulp.series('build-sass')));
gulp.task('watch-docs-sass', () => gulp.watch(sass_docs_src, { ignoreInitial: false }, gulp.series('build-docs-sass')));
gulp.task('watch-js', () => gulp.watch(js_transpile_src, { ignoreInitial: false }, gulp.series('build-js')));
gulp.task('watch-docs-js', () => gulp.watch(js_docs_src, { ignoreInitial: false }, gulp.series('build-docs-js')));

gulp.task('watch', gulp.parallel('watch-fonts', 'watch-images', 'watch-html', 'watch-sass', 'watch-docs-sass', 'watch-js', 'watch-docs-js'));

gulp.task('default', gulp.series('clean', 'connect', 'watch'));
