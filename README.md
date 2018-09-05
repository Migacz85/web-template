# Web template project

The main idea here is to create a simple but powerful template that can
be reused in the future web apps projects. That can help creating faster,
better quality projects on solid skeleton. This project also include
template tREADME.md file from code institute that can be used as a
guideline to create your own project with proper README.md

## Features

Automatisation of the workflow is done by gulp.
In the root folder all files are a source files, and the build folder contains:

css files built from scss files are automatically:
 - concatenated
 - autoprefixed
 - minified
 - sourcemaped
 - moved to /build/css

js files built from files are automatically::
 - concatenated
 - autoprefixed
 - minified
 - sourcemaped
 - moved to /build/js

img are automatically:
 - files in /img are automatically compressed and moved to build/img

Project is automatically:
 - reloading browser using browser-sync
 - thanks to browser-sync you can see the site on your laptop and mobile at the
 same time when developing the app


### Features left to implement

Key features to implement to this template:

 - babel
 - jasmine
 - lintering
 - bootstrap

### Existing Tasks 

To run tasks type gulp and task name. For example: gulp photo
Current tasks for this project: 

 - photo  
 - delete-photos
 - styles
 - script
 - default:
     - script
     - styles
     - delete-photos
     - photo
 - reload
 - server

##  How to start ?

In this particular project i had installed

gulp version:
CLI version 2.0.1
Local version 4.0.0

In order to start you need to have a installed node package manager

```
npm install 
sudo npm install gulp -g
sudo npm i -g gulp-cli
```

After that start server: 

```
gulp server
```
Your project will run, and do automaticaly things for you. 
Enjoy :-)