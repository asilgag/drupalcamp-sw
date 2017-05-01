var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var del = require('del');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');
var swPrecache = require('sw-precache');
var reload = browserSync.reload;
var pkg = require('../package.json');
var config = require('../gulpconfig.js');


// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
/*
gulp.task('generate-service-worker:copy', function() {
  return gulp.src([
    'node_modules/sw-toolbox/sw-toolbox.js'
    //'src/js/runtime-caching.js'
  ])
    .pipe(gulp.dest(config.js.src));
});
*/

gulp.task('serviceworker:clean', ['serviceworker:init:clean', 'serviceworker:import:clean'], function() {
  var filePath = path.join(
    config.serviceworker.dest.relativePath,
    config.serviceworker.dest.fileName
  );
  return del(filePath, {force: true});
});


gulp.task('serviceworker', ['serviceworker:init', 'serviceworker:import'], function() {
  var filepath = path.join(
    config.serviceworker.dest.relativePath,
    config.serviceworker.dest.fileName
  );

  var importScripts = config.serviceworker.importScripts.src.map(function(currentValue) {
    return path.join(
      config.serviceworker.dest.absolutePath,
      config.serviceworker.importScripts.dest,
      currentValue.replace(/.*\//, "")
    );
  });

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'drupal-service-worker',

    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: importScripts,

    // Add/remove glob patterns to match your directory setup.
    staticFileGlobs: config.serviceworker.staticFileGlobs,

    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    replacePrefix: config.serviceworker.dest.absolutePath + '/',

    verbose: true
  });
});

gulp.task('serviceworker:init', function() {
  return gulp.src(config.serviceworker.initScript.src)
    .pipe(gulp.dest(config.serviceworker.initScript.dest));
});

gulp.task('serviceworker:init:clean', function() {
  return gulp.src(config.serviceworker.initScript.src)
    .pipe(replace('mustUnRegister = false;', 'mustUnRegister = true;'))
    .pipe(gulp.dest(config.serviceworker.initScript.dest));
});

gulp.task('serviceworker:import', function() {
  return gulp.src(config.serviceworker.importScripts.src)
    .pipe(gulp.dest(config.serviceworker.importScripts.dest));
});

gulp.task('serviceworker:import:clean', function() {
  return config.serviceworker.importScripts.src.map(function(file) {
    var fileName = config.serviceworker.importScripts.dest + '/' + file.replace(/^.*[\\\/]/, '');
    del(fileName);
  });
});

gulp.task('serviceworker:watch', function() {
  gulp.watch(config.serviceworker.importScripts.src, ['serviceworker'], reload);
  gulp.watch(config.serviceworker.staticFileGlobs, ['serviceworker'], reload);
});