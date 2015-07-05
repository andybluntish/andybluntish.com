/* node: true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var path = require('path');
var glob = require('glob');
var cp = require('child_process');
var pkg = require(path.join(__dirname, 'package.json'));
var env = (process.env.NODE_ENV || 'development').toLowerCase();
var paths = {
  src: 'app',
  dest: 'dist',
  vendor: 'vendor'
};

// Content (process dist files, after Jekyll has run)
gulp.task('content', function() {

  // Create filter to operate only on HTML files
  var html = $.filter('**/*.html');

  return gulp.src(path.join(paths.dest, '**', '*.{html,txt}'))
    .pipe(html)
    .pipe($.if(env === 'production', $.htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(html.restore())
    .pipe($.replaceTask({
      patterns: [{
        match: 'version',
        replacement: function() { return pkg.version; }
      }]
    }))
    .pipe(gulp.dest(paths.dest));
});

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
    .pipe(gulp.dest(path.join(paths.dest, 'css')))
    .pipe(browserSync.stream());
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

// Build
gulp.task('build', ['content', 'styles', 'scripts']);

// Serve
gulp.task('serve', ['build'], function() {

  // Start Jekyll server
  cp.spawn('jekyll', ['serve'], { stdio: 'inherit' });

  // Start BrowserSync server to proxy the Jekyll server
  browserSync.init({
    proxy: '0.0.0.0:4000',
    open: false,
    notify: false,
    reloadOnRestart: true
  });

  // Watch for changes to built content files (rebuilt by Jekyll server),
  //   do some extra processing, then reload the browser.
  gulp.watch(path.join(paths.dest, '**', '*.{html,txt,xml}'), ['content', browserSync.reload]);

  // Watch SASS files, then recompile and inject new styles.
  gulp.watch(path.join(paths.src, 'css', '**', '*.scss'), ['styles']);

  // Watch JS files, then recompile and reload the browser.
  gulp.watch(path.join(paths.src, 'js', '**', '*.js'), ['scripts', browserSync.reload]);
});

// Default
gulp.task('default', ['build']);
