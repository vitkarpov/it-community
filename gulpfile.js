'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  nodemon = require('gulp-nodemon');

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(['app/scripts/**/*.js'])
    .pipe(uglify({
      mangle: false
    }))
    .pipe(concat('build.min.js'))
    .pipe(gulp.dest('app/build'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['app/scripts/**/*.js', '*.js'], ['scripts']);
});

gulp.task('server', function() {
  nodemon({
    script: 'app.js',
    ext: 'html js',
    ignore: ['app/scripts/**/*.js']
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'watch', 'server']);