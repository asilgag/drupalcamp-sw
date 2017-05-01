'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir')('./gulp_tasks');

var $ = require('gulp-load-plugins')();
var config = require('./gulpconfig.js');


gulp.task('default', function(done) {
  runSequence(
    ['build'],
    ['watch'],
    done);
});

gulp.task('watch', [
  'styles:watch',
  'js:watch',
  'images:watch',
  'serviceworker:watch'
]);


gulp.task('build', function(done) {
  runSequence(
    ['images', 'styles', 'js'],
    ['serviceworker'],
    done);
});


