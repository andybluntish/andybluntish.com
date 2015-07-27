/* node: true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var path = require('path');
var glob = require('glob');
var cp = require('child_process');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var pkg = require(path.join(__dirname, 'package.json'));
var env = (process.env.NODE_ENV || 'development').toLowerCase();
var paths = {
  src: 'app',
  dest: 'dist',
  vendor: 'vendor'
};

// Jekyll
gulp.task('jekyll', function(done) {
  return cp.spawn('jekyll', ['build'], { stdio: 'inherit' })
    .on('close', done);
});

// Content (process dist files, after Jekyll has run)
gulp.task('content', ['jekyll'], function() {

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

// Images
gulp.task('images', function() {
  var icons = gulp.src(path.join(paths.src, 'img', 'icons', '*.svg'))
    .pipe($.svgstore())
    .pipe($.rename(path.join('img', 'icons.svg')))
    .pipe($.cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('symbol').each(function() {
          var title = $(this).attr('id').replace('-', ' ');

          $(this)
            .attr('fill', 'currentColor')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .prepend('<title>' + title + '</title>');
        });
      },
      parserOptions: { xmlMode: true }
    }));

  var favicons = gulp.src(path.join(paths.src, '*.{png,ico}'));
  var images = gulp.src(path.join(paths.src, '+(img)', '!(icons)', '*.{svg,png,jpg,gif}'));

  return merge(icons, favicons, images)
    .pipe($.if(env === 'production', $.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    })))
    .pipe(gulp.dest(paths.dest));
});

// Build
gulp.task('build', function(done) {
  return runSequence('content', ['styles', 'scripts', 'images'], done);
});

// Serve
gulp.task('serve', ['build'], function() {

  // Start BrowserSync server
  browserSync.init({
    open: false,
    notify: false,
    reloadOnRestart: true,
    server: {
      baseDir: paths.dest
    }
  });

  // Watch for changes to content files,
  //   rebuild with Jekyll,
  //   do some extra processing,
  //   then reload the browser.
  gulp.watch([
    path.join(paths.src, '**', '*.{html,md,txt,json,xml,yml}'),
    path.join(__dirname, '**', '*.yml'),
  ], ['content', browserSync.reload]);

  // Watch src SASS files, recompile, and inject new styles.
  gulp.watch(path.join(paths.src, 'css', '**', '*.scss'), ['styles']);

  // Watch src JS files, recompile, and reload the browser.
  gulp.watch(path.join(paths.src, 'js', '**', '*.js'), ['scripts', browserSync.reload]);

  // Watch src image files, do some extra processing, then reload the browser.
  gulp.watch(path.join(paths.src, '**', '*.{svg,png,jpg,gif,ico}'), ['images', browserSync.reload]);
});

// Default
gulp.task('default', ['build']);
