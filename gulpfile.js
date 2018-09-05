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

//Paths 

var SCRIPT_PATH = 'js/**/*.js';
var DIST_PATH = 'build/css';
var CSS_PATH = 'css/**/*.css';
var SCSS_PATH = 'scss/**/*.scss'

// Pure Css Styles Automation - function in this project is unused. 
// but if you want use in your project pure css you can use that one
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
    .pipe(gulp.dest(DIST_PATH))
});

// Photos
gulp.task('photo', function () {
    return gulp.src(['img/**/*'])
        .pipe(imagemin([
            imageminMozjpeg({
                quality: 50 //0 (worst) to 100 (perfect).
            })
        ]))
        .pipe(gulp.dest('build/img'));
});

gulp.task('delete-photos', function () {
    return gulp.src('build/img', {
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
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write()) //how files was look like after?
        .pipe(gulp.dest(DIST_PATH))
});


// JS automation
gulp.task('script', function () {
    
    return  gulp.src(SCRIPT_PATH)
            .pipe(plumber(function(err) {
            console.log('Java script errors:')
            console.log(err)
            this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(minify())
            .pipe(concat('scripts.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('build/js'));
            
});

//Build whole project from the begining to build/ without running the server
gulp.task('default',  gulp.series('script', 'styles', 'delete-photos', 'photo'), function () {
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