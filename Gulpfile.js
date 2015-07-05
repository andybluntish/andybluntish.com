/* node: true */
'use strict';

var env = (process.env.NODE_ENV || 'development').toLowerCase();
var paths = {
  src: 'app',
  dest: 'dist',
  vendor: 'vendor'
};

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var glob = require('glob');

// Styles
gulp.task('styles', function() {
  return gulp.src(path.join(paths.src, 'css', 'main.scss'))
    .pipe($.sass({
      style: 'expanded',
      precision: 10,
      errLogToConsole: true
    }))
    .pipe($.concat('main.css'))
    .pipe($.if(env === 'production', $.uncss({
      html: glob.sync(path.join(paths.dest, '**', '*.html'))
    })))
    .pipe($.autoprefixer())
    .pipe($.if(env === 'production', $.minifyCss()))
    .pipe(gulp.dest(path.join(paths.dest, 'css')));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(path.join(paths.src, 'js', '**', '*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe($.babel())
    .pipe($.if(env === 'production', $.uglify()))
    .pipe(gulp.dest(path.join(paths.dest, 'js')));
});

// Default
gulp.task('default', ['styles', 'scripts']);
