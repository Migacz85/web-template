const gulp = require('gulp');
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const pump = require('pump');
const minify = composer(uglifyjs, console);
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const reload = browserSync.reload;
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const clean = require('gulp-clean');

// SETTINGS 
// Build paths
var BUILD_PATH = 'build'
var BUILT_MIN_CSS_PATH = 'build/min-css';  //Automated task: Convert scss in to minified css here
var BUILD_IMG_PATH = 'build/img'; //Automated task: Compress new photos from IMG_PATH 
var BUILD_JS_PATH ='build/js'; //Automated task: Join all js files  

// Source paths
var CSS_PATH = 'build/css'        //Automated task: put here a copy of css files. For reading only purpose.
var SCRIPTS_PATH = 'js/*.js';
var SCSS_PATH = 'scss/**/*.scss';
var IMG_PATH = 'img/**/*';

// Order how js will be concated
var JS_ORDER = [ 'js/zfirst.js', SCRIPTS_PATH ]

// Picture quality 0 (worst) to 100 (perfect).
var QUALITY = 40   

// Pure Css Styles Automation - function in this project is unused. 
// but if you want use in your project pure css you can use that one instead of scss
gulp.task('css-styles', function () {    
    console.log('starting styles task');
    return gulp.src(CSS_PATH)
    .pipe(plumber(function(err) {
        console.log("Error: ");
        console.log(err);
        this.emit('end');
    }))
    .pipe(sourcemaps.init()) //how files was look before?
    .pipe(autoprefixer()) 
    // you can pass object into autoprefixer:
    // for example { browser: ['last 2 versions', 'ie 8']
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write()) //how files was look after?
    .pipe(gulp.dest(CSS_DIST_PATH))
});

// Photos
gulp.task('photo', function () {
    return gulp.src([IMG_PATH])
        .pipe(imagemin([
            imageminMozjpeg({
                quality: QUALITY
            })
        ]))
        .pipe(gulp.dest(BUILD_IMG_PATH));
});

gulp.task('delete-photos', function () {
    return gulp.src(BUILD_IMG_PATH, {
            read: false
        })
        .pipe(clean());
});

gulp.task('delete-build', function () {
    return gulp.src(BUILD_PATH, {
            read: false
        })
        .pipe(clean());
});
// SCSS automation
gulp.task('styles', function () {
    console.log('starting SCSS styles task');
    return gulp.src(SCSS_PATH)
        .pipe(plumber(function (err) { 
            console.log("Error: ");
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) //how files was look like before
        .pipe(autoprefixer())
        // you can pass object into autoprefixer:
        // for example { browser: ['last 2 versions', 'ie 8']
        .pipe(sass(
            //{outputStyle: 'compressed'}
        ))
        .pipe(gulp.dest(CSS_PATH)) 
        .pipe(minifyCss())
        .pipe(sourcemaps.write()) //how files was look like after?
        .pipe(gulp.dest(BUILT_MIN_CSS_PATH))
});
// JS automation
gulp.task('script', function () {
    
    return  gulp.src(JS_ORDER)
            .pipe(plumber(function(err) {
            console.log('Java script errors:')
            console.log(err)
            this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(minify())
            .pipe(concat('scripts.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(BUILD_JS_PATH));         
});
//Build whole project from the begining to build/ without running the server
gulp.task('default',  gulp.series('delete-build' ,'script', 'styles', 'photo'), function () {
    console.log('Building your project...');
    gulp.series('script')
    gulp.series('styles')
    gulp.series('delete-photos')
    gulp.series('photo')
});

// Reload the webpage
gulp.task('reload', function () {
    console.log('Reloading page')
    browserSync.reload()
});

// Static server
gulp.task('server', function () {
    
    gulp.series('delete-build' ,'script', 'styles', 'photo')
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("js/**/*js", gulp.series('script'));
    gulp.watch(SCSS_PATH, gulp.series('styles'));
    gulp.watch("img/**/*", gulp.series('delete-photos'));
    gulp.watch("img/**/*", gulp.series('photo'));
    gulp.watch("build/**/*.css").on("change", reload)
    gulp.watch("*.html").on("change", reload)
    gulp.watch("build/js/**/*").on("change", reload)
});