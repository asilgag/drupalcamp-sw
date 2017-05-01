var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    config = require('../gulpconfig.js');

gulp.task('js', function() {
  return gulp.src(config.js.srcFiles)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('js:watch', function () {
  gulp.watch(config.js.srcFiles, ['js', reload]);
});
