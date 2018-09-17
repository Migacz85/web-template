# Web template project

The main idea here is to create a simple but powerful template that can
be reused in the future web apps projects. That can help create faster,
better quality projects on solid skeleton. This project also include
“template — README.md” file from code institute that can be used as a
guideline to create your own project with proper README.md

## Features

In the source folder you will find source files and mainly here developing will happen. In the build folder while you develop will be generated ready to use site.
After finishing your project you can take this folder and deploy it.

Files in build folder:

Css files built from source/*.scss files are automatically:
 - concatenated
 - autoprefixed
 - minified
 - sourcemaps
 - moved to /build/min-css/styles.css

Js files built from source/js/*.js are automatically:
 - compiled with babel (es7) 
 - concatenated
 - autoprefixed
 - minified
 - sourcemaps
 - moved to one file /build/js/scripts.js

Img are automatically:
 - files in /img are compressed and moved to build/img

All html files from source/ are moved to build/
index.html is linked to generated files from:

/build/min-css/styles.css
/build/js/scripts.js

README.md is modified for .html version. 
You can live preview how it will look like in pure html.

Project is automatically:
 - reloading browser using browser-sync
 - thanks to browser-sync you can see the site on your laptop and mobile at the same time when developing the app and making changes. 

## Files

#### gulpfile.js - All automation of the project workflow is configured here. 
This file is for a gulp package. And is the main script where automation is triggering and described how exactly work. Gulp is using plugins that are listed in package.json file as well. The essential list of plugins for gulp used in this project:

Autoprefixer (for better css support in browsers)
https://github.com/sindresorhus/gulp-autoprefixer#readme
- Babel - (for better javascript support in browsers)
https://github.com/babel/gulp-babel#readme
- Concat (for concat js, css files)
https://github.com/gulp-community/gulp-concat#readme
- Image optimization:
https://github.com/sindresorhus/gulp-imagemin#readme
- Jasmine (for automated tests)
https://github.com/mucsi96/gulp-jasmine-livereload-task
- Plubmer (for printing errors while developing, and keeping server running)
https://github.com/floatdrop/gulp-plumber
- Sass (for converting sass in to css)
https://github.com/dlmanning/gulp-sass#readme
- Sourcemaps (for ability to work on minified js files)
https://github.com/gulp-sourcemaps/gulp-sourcemaps
- Uglify (for compacting size of js files)
https://github.com/terinjokes/gulp-uglify/
- Watch (for observing if files you working on changed)
https://github.com/floatdrop/gulp-watch#readme
- Markdown (for changing README.md in to html to preview changes)

The task 'gulp' is defined in task 'default'. The task 'photo' in task photo. For easy understanding this file I even left a comment for each task. 

##### Configuration gulpfile.js

If you want to start a server from different port you can set it up on line 39:

```
const PORT = 9997;
````

If you want change strength of the photo compression you can do it here.
Picture quality 0 (worst) to 100 (perfect).

```
const QUALITY = 40; 
```

If you want to specify order how .js files will be concatenated you can specify them in array JS_ORDER. In following example script zfirst.js will be added first and then rest of the scripts.

```
const JS_ORDER = ['source/js/zfirst.js', SCRIPTS_PATH];
```

#### .eslintrc.json - In that file the syntax of javascript is specified. 

Eslint will prompt you if your javascript code is note written with correct syntax. That's help to maintain clear code. By default, airbnb style is implemented with jasmine and es6 support. Please install eslint extension in your editor of choice to use that.

Read more about eslint airbnb syntax: 
https://github.com/airbnb/javascript

#### SpecRunner.html - tests in jasmine.

When running the task ```gulp jasmine-live``` this file will be generated and live reloaded each time you change the *.js files. And all jasmine tests will be shown.

#### template - README.md  

When starting new project it's important to write a good documentation. Just grab this file and rename it to README.md and edit it to project you currently developing. This file is brought by code-institute. Please check for new versions here:

https://github.com/Code-Institute-Solutions/readme-template

While writing documentation for github this can be useful link to:

https://help.github.com/articles/basic-writing-and-formatting-syntax/

#### package.json - All development packages from node package manager are listed in this file. 

When you will download this project, and make ```npm install``` all of them will be installed in your node_modules folder. They are essential for this project to work.


### Features left to implement

Key features to implement to this template:

 - nunjucks 
 - css for README.md - to render html version exactly like on github pages

### Existing Tasks 

To run tasks type gulp and task name. For example: 
```
gulp photo
```
Current tasks for this project: 

- jasmine-live (run the jasmine testing)
- photo (optimize photos in src/img)
- delete-photos (delete photos in build/img)
- delete-build (delete whole build folder)
- copy (copy all *html files from source to build)
- styles (convert sass to css and put it to bulid/css and min file to build/min-css)
- script (convert all js and put it to bulid/js)
- reload (reload the browser)
- server (start watching all files in project and automatically refresh the site and do following tasks)
  - default
  - copy
  - script
  - styles
  - photo
  - server

## Technologies used:

- gulp 

https://gulpjs.com/

- sass

http://sass-lang.com/documentation/file.SASS_REFERENCE.html

- babel (in this project es7 )

https://github.com/babel/gulp-babel
https://babeljs.io/

- eslint 

Implemented with airbnb 
https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

##  How to start ?

In this particular project I had installed

gulp version:
CLI version 2.0.1
Local version 4.0.0

In order to start you need to have an installed node package manager

In folder, you want to start a project type:
```
git clone https://github.com/Migacz85/web-template.git
npm install
sudo npm install gulp -g
sudo npm i -g gulp-cli
```

After that run the command: 

```
gulp
```
It will make 2 things — build your project to folder 'build' and
your project will run, and do automatically things for you. 

For testing in jasmine run in second terminal:

```
gulp jasmine-live
```

## Known bugs

- You need to change manually PORT number every time jasmine stops to re run,
- Eslint is throwing errors on _spec.js - spec file for jasmine even after including 'jasmine': true in .eslintrc.json  

# Npm bugs

npm audit gives message:
found 13 vulnerabilities (3 low, 8 moderate, 2 critical) in 21824 scanned packages
  13 vulnerabilities require manual review. See the full report for details.

Dependencies causing these problems:

moderate:

- gulp-imagemin
- gulp-imagemin-mozjpeg

low:

- browser-sync

critical:

- jasmine-live-reloading
