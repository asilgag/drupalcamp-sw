'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nn = require('node-notifier'),
    $ = require('gulp-load-plugins')(),
    config = require('../gulpconfig.js');


var srcFiles = config.styles.srcFiles,
    srcMainFiles = config.styles.srcMainFiles,
    srcPath = config.styles.srcPath,
    dest = config.styles.dest;

function errorHandler(error, error_type) {
	var notifier = new nn.NotificationCenter();
	notifier.notify({
		title: "ERROR!!",
		message: error.message
	});
	console.error("\n" + error.message);
	this.emit('end');
}

gulp.task('styles', ['styles:src', 'styles:vendor', 'styles:vendor:fonts']);

gulp.task('styles:src', function () {
  var cb = gulp
    .src(srcMainFiles, { base: srcPath })
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe($.sass({ precision: 10 }))
    .pipe($.autoprefixer('last 2 version', '> 1%', 'ie >= 8', 'Opera 12.1'))
    .pipe(gulp.dest(dest))
    .pipe($.notify("CSS compilation done"));
  return cb;
});


gulp.task('styles:vendor', function() {
  return gulp.src(config.styles.vendor.vendorFiles)
    .pipe($.concat('vendor.css'))
    .pipe(gulp.dest(config.styles.vendor.dest));
});

gulp.task('styles:vendor:fonts', function() {
  return gulp.src(config.styles.vendor.font.files)
      .pipe(gulp.dest(config.styles.vendor.font.dest));
});

gulp.task('styles:watch', function() {
  gulp.watch(srcFiles, ['styles'], reload);
});
