const gulp = require('gulp');
const babel = require('gulp-babel');
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyjs, console);
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const reload = browserSync.reload;
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');

// SETTINGS 
// Build paths
const BUILD_PATH = 'build';
const BUILT_MIN_CSS_PATH = 'build/min-css/';  //Automated task: Convert scss in to minified css here
const BUILD_IMG_PATH = 'build/img/'; //Automated task: Compress new photos from IMG_PATH 
const BUILD_JS_PATH ='build/js/'; //Automated task: Join all js files  

// Source paths
const SOURCE_PATH='source/*html'
const CSS_PATH = 'build/css';        //Automated task: put here a copy of css files. For reading only purpose.
const SCRIPTS_PATH = 'source/js/**/*.js';
const SCSS_PATH = 'source/scss/**/*.scss';
const IMG_PATH = 'source/img/**/*';


// Order how js will be concated
const JS_ORDER = ['source/js/zfirst.js', SCRIPTS_PATH];

// Picture quality 0 (worst) to 100 (perfect).
var QUALITY = 40 ;

// Pure Css Styles Automation - function in this project is unused. 
// but if you want use in your project pure css you can use that one instead of scss
gulp.task('css-styles', function () {    
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
    return gulp.src('BUILD_IMG_PATH', {
            read: false
        })
        .pipe(clean( {allowEmpty: true}))
        
});


gulp.task('delete-build', function () {
    return gulp.src(BUILD_PATH, {
            read: false
        })
        .pipe(clean());
});

gulp.task('copy', function() {
    return gulp
    .src(SOURCE_PATH)
    .pipe(gulp.dest(BUILD_PATH));
});
// Jasmine

gulp.task('jasmine', () =>
    gulp.src(BUILD_JS_PATH+'scripts.js')
        .pipe(jasmine({
            reporter: new reporters.JUnitXmlReporter()
        }))
);
// SCSS automation
gulp.task('styles', function () {
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
            .pipe(babel({
                presets:['env']
            }))
            .pipe(minify())
            .pipe(concat('scripts.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(BUILD_JS_PATH));         
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
            baseDir: "./build"
        }
    });

    gulp.watch("source/js/**/*js", gulp.series('script'));
    gulp.watch(SCSS_PATH, gulp.series('styles'));
    gulp.watch("source/img/**/*", gulp.series('delete-photos'));
    gulp.watch("source/img/**/*", gulp.series('photo'));
    gulp.watch("build/**/*.css").on("change", reload)
    gulp.watch("source/*.html", gulp.series('copy'));
    gulp.watch("build/*.html").on("change", reload)
    gulp.watch("build/js/**/*").on("change", reload)
});

//Build whole project and run the server
gulp.task('default',  gulp.series('copy', 'script', 'styles', 'photo', 'server'), function () {
   
    
});

