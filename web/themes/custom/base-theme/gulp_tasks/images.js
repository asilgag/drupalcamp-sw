var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var path = require('path');
var osTmpdir = require('os-tmpdir');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../gulpconfig.js');

gulp.task('images', ['images:inline'], function() {
  return gulp.src(config.images.standard.src)
    .pipe(newer(config.images.standard.dest))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        js2svg: {pretty: true},
        plugins: [{removeTitle: true}, {removeViewBox: true}]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(config.images.standard.dest));
});

gulp.task('images:inline', function() {
  return gulp.src(config.images.inline.src)
    .pipe(newer(config.images.inline.dest))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        js2svg: {pretty: true},
        plugins: [{removeTitle: true}, {removeViewBox: true}]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(config.images.inline.dest));
});


gulp.task('images:drupal', function() {
  return gulp.src(config.images.drupal.srcDir + config.images.drupal.srcGlob)
    // .pipe(newer(config.images.drupal.dest))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        js2svg: {pretty: true},
        plugins: [{removeTitle: true}, {removeViewBox: true}]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(path.join(osTmpdir(),'files')));
});

gulp.task('images:drupal:copyback', function() {
  return gulp.src(path.join(osTmpdir(),'files'))
    .pipe(gulp.dest(config.images.drupal.srcDir));
});



gulp.task('images:watch', function() {
  gulp.watch([config.images.standard.src, config.images.inline.src], ['images'], reload);
});
