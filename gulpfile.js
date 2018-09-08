/* eslint-env node */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const jasmineBrowser = require('gulp-jasmine-browser');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine-livereload-task');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync').create();
// const run = require('gulp-run-command').default;


const minify = composer(uglifyjs, console);

// SETTINGS
// Build paths
const BUILD_PATH = 'build';
const BUILT_MIN_CSS_PATH = 'build/min-css/'; // Automated task: Convert scss in to minified css here
const BUILD_IMG_PATH = 'build/img/'; // Automated task: Compress new photos from IMG_PATH
const BUILD_JS_PATH = 'build/js/'; // Automated task: Join all js files

// Source paths
const SOURCE_PATH = 'source/*html';
const CSS_PATH = 'source/css'; // Automated task: put here a copy of css files. For reading only purpose.
const SCRIPTS_PATH = 'source/js/**/*.js';
const SCSS_PATH = 'source/scss/**/*.scss';
const IMG_PATH = 'source/img/**/*';

// For testing in jasmine
const PORT = 9997;
const SPEC_PATH = 'source/spec/_spec.js';
const JASMINE_PATH = [SCRIPTS_PATH, SPEC_PATH, CSS_PATH];

// Order how js will be concatenated
const JS_ORDER = ['source/js/zfirst.js', SCRIPTS_PATH];

// Picture quality 0 (worst) to 100 (perfect).
const QUALITY = 40;

// Testing with jasmine

// Is working with live-reload but this dependencies is causing 2 critical vulnerabilities from npm
// https://www.npmjs.com/package/gulp-jasmine-livereload-task

gulp.task('jasmine-live', jasmine({
  files: JASMINE_PATH,
  specRunner: ['./source/spec'],
  staticAssetsPath: ['./source/spec'],
  livereload: PORT,
}));

// Works without auto-reloading the page
// Official tip from jasmine:
// https://github.com/jasmine/gulp-jasmine-browser

gulp.task('jasmine', () => {
  const filesForTest = JASMINE_PATH;
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({
      port: PORT,
    }));
});

// Under development dont use
gulp.task('jasmine-chrome', () => gulp.src([SCRIPTS_PATH, SPEC_PATH])
  .pipe(jasmineBrowser.specRunner({
    console: true,
  }))
  .pipe(jasmineBrowser.headless({
    driver: 'chrome',
  })));

// Photos
gulp.task('photo', () => gulp.src([IMG_PATH])
  .pipe(imagemin([
    imageminMozjpeg({
      quality: QUALITY,
    }),
  ]))
  .pipe(gulp.dest(BUILD_IMG_PATH)));

gulp.task('delete-photos', () => gulp.src('BUILD_IMG_PATH', {
  read: false,
})
  .pipe(clean({
    allowEmpty: true,
  })));


gulp.task('delete-build', () => gulp.src(BUILD_PATH, {
  read: false,
})
  .pipe(clean()));

gulp.task('copy', () => gulp
  .src(SOURCE_PATH)
  .pipe(gulp.dest(BUILD_PATH)));

// SCSS automation
gulp.task('styles', () => gulp.src(SCSS_PATH)
  .pipe(plumber(function (err) {
    console.log('Error: ');
    console.log(err);
    this.emit('end');
  }))
  .pipe(sourcemaps.init()) // how files was look like before
  .pipe(autoprefixer())
// you can pass object into autoprefixer:
// for example { browser: ['last 2 versions', 'ie 8']
  .pipe(sass(
    // {outputStyle: 'compressed'}
  ))
  .pipe(gulp.dest(CSS_PATH))
  .pipe(minifyCss())
  .pipe(sourcemaps.write()) // how files was look like after?
  .pipe(gulp.dest(BUILT_MIN_CSS_PATH)));
// JS automation
gulp.task('script', () => gulp.src(JS_ORDER)
  .pipe(plumber(function (err) {
    console.log('Java script errors:');
    console.log(err);
    this.emit('end');
  }))
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(minify())
  .pipe(concat('scripts.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(BUILD_JS_PATH)));

// Reload the webpage
gulp.task('reload', () => {
  console.log('Reloading page');
  browserSync.reload();
});

// Static server
gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
  gulp.watch('source/js/**/*js', gulp.series('script'));
  gulp.watch(SCSS_PATH, gulp.series('styles'));
  gulp.watch('source/img/**/*', gulp.series('delete-photos'));
  gulp.watch('source/img/**/*', gulp.series('photo'));
  gulp.watch('build/**/*.css').on('change', browserSync.reload);
  gulp.watch('source/*.html', gulp.series('copy'));
  gulp.watch('build/*.html').on('change', browserSync.reload);
  gulp.watch('build/js/**/*').on('change', browserSync.reload);
});

// Build whole project and run the server
gulp.task('default', gulp.series('copy', 'script', 'styles', 'photo', 'server'), () => {
});
