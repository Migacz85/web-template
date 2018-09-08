# Web template project

The main idea here is to create a simple but powerful template that can
be reused in the future web apps projects. That can help creating faster,
better quality projects on solid skeleton. This project also include
template tREADME.md file from code institute that can be used as a
guideline to create your own project with proper README.md

## Features

In the source folder you will find source files and mainly here developing will happen. 
In the build folder while you develop will be generated ready to use site.
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

All html files from source/ are moved to build/. 
index.html is linked to generated files from:

/build/min-css/styles.css
/build/js/scripts.js

Project is automatically:
 - reloading browser using browser-sync
 - thanks to browser-sync you can see the site on your laptop and mobile at the same time when developing the app and making changes. To achieve this
 use external ip that will be shown after running:

 '''
 gulp
 '''

 But read first "How to start".

### Features left to implement

Key features to implement to this template:

 - nunjucks 

### Existing Tasks 

To run tasks type gulp and task name. For example: gulp photo

Current tasks for this project: 

- ├── jasmine-live
- ├── jasmine
- ├── jasmine-chrome (don't work)
- ├── photo
- ├── delete-photos
- ├── delete-build
- ├── copy
- ├── styles
- ├── script
- ├── reload
- ├── server
- └─┬ default
-   └─┬ series
-     ├── copy
-     ├── script
-     ├── styles
-     ├── photo
-     └── server

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

In order to start you need to have a installed node package manager

In folder you want to start a project type:
```
git clone https://github.com/Migacz85/web-template.git
npm install 
sudo npm install gulp -g
sudo npm i -g gulp-cli
```

After that run the command: 

```
gulp server
```
It will make 2 things - build your project to folder "build" and
your project will run, and do automatically things for you. 

For testing in jasmine run:

```
gulp jasmine-live
```

## Known bugs

- Jasmine server sometimes stops - fixed
- You need to change manually PORT number every time jasmine stops to re run,
- If there are no photos - task photos will crash.
- Eslint is throwing errors on _spec.js - spec file for jasmine even after including    "jasmine": true in .eslintrc.json  

# Npm bugs

npm audit gives message:
found 13 vulnerabilities (3 low, 8 moderate, 2 critical) in 21824 scanned packages
  13 vulnerabilities require manual review. See the full report for details.

dependencies causing this problems:

moderate:

- gulp-imagemin
- gulp-imagemin-mozjpeg

low:

- browser-sync

critical:

- jasmine-live-reloading
