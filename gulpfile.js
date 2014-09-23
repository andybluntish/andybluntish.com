'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');

var argv = require('yargs').argv;
var ENV = ~['production', 'prod', 'p'].indexOf(argv.env) ? 'production' : 'development'; // jshint ignore:line

// Clean
gulp.task('clean', function() {
  require('del').bind(null, ['build']);
  $.cache.clearAll();
});

// Styles
gulp.task('styles', function() {
  var styles = gulp.src('src/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }));

  var bower = gulp.src([
    'bower_components/normalize-css/normalize.css',
    'bower_components/normalize-opentype.css/normalize-opentype.css'
  ]);

  var stream = merge(bower, styles)
    .pipe($.concat('main.css'))
    .pipe($.autoprefixer());

  if (ENV === 'production') {
    stream = stream.pipe($.uncss({
        html: ['src/index.html']
      }))
      .pipe($.csso());
  }

  return stream.pipe(gulp.dest('build/styles'))
    .pipe(reload({
      stream: true
    }));
});

// Scripts
gulp.task('scripts', function() {
  var scripts = gulp.src('src/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));

  var bower = gulp.src([
    'bower_components/svg4everybody/svg4everybody.js',
    'bower_components/picturefill/dist/picturefill.js'
  ]);

  var stream = merge(bower, scripts)
    .pipe($.concat('main.js'));

  if (ENV === 'production') {
    stream = stream.pipe($.uglify());
  }

  return stream.pipe(gulp.dest('build/scripts'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    })))
    .pipe(gulp.dest('build/images'));
});

// HTML
gulp.task('html', function() {
  var stream = gulp.src('src/**/*.html');

  if (ENV === 'production') {
    stream = stream.pipe($.htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeOptionalTags: false,
      removeRedundantAttributes: true,
      useShortDoctype: true
    }));
  }

  return stream.pipe(gulp.dest('build'));
});

// Txt
gulp.task('txt', function() {
  return gulp.src('src/**/*.txt')
    .pipe(gulp.dest('build'));
});

// Replace
gulp.task('replace', ['html', 'txt'], function() {
  var data = require('./src/data.json');
  var pkg = require('./package.json');
  var now = new Date();

  return gulp.src('build/**/*.{html,txt}')
    .pipe($.replaceTask({
      patterns: [
        {
          match: 'version',
          replacement: function() { return pkg.version; }
        },
        {
          match: 'url',
          replacement: function() { return data.site.url; }
        },
        {
          match: 'ga',
          replacement: function() { return data.site.ga; }
        },
        {
          match: 'est',
          replacement: function() { return data.site.est; }
        },
        {
          match: 'isoDate',
          replacement: function() { return now.toISOString(); }
        },
        {
          match: 'year',
          replacement: function() { return now.getFullYear(); }
        },
        {
          match: 'metaTitle',
          replacement: function() { return data.meta.title; }
        },
        {
          match: 'metaDescription',
          replacement: function() { return data.meta.description; }
        },
        {
          match: 'title',
          replacement: function() { return data.site.title; }
        },
        {
          match: 'authorName',
          replacement: function() { return data.author.name; }
        },
        {
          match: 'authorURL',
          replacement: function() { return data.author.url; }
        },
        {
          match: 'authorEmail',
          replacement: function() { return data.author.email; }
        },
        {
          match: 'authorTwitter',
          replacement: function() { return data.author.twitter; }
        },
        {
          match: 'authorCity',
          replacement: function() { return data.author.location.city; }
        },
        {
          match: 'authorRegion',
          replacement: function() { return data.author.location.region; }
        },
        {
          match: 'authorCountry',
          replacement: function() { return data.author.location.country; }
        }
      ]
    }))
    .pipe(gulp.dest('build'));
});

// Extras
gulp.task('extras', function() {
  return gulp.src([
    'src/apple-touch-icon-precomposed.png',
    'src/favicon.ico',
    'src/CNAME'
  ]).pipe(gulp.dest('build'));
});

gulp.task('rev',function() {
  var assets = $.filter(['**/*.css', '**/*.js', '**/*.jpg', 'images/*.png', '**/*.svg']);

  return gulp.src('./build/**/*')
    .pipe(assets)
    .pipe($.rev())
    .pipe($.revCssUrl())
    .pipe(assets.restore())
    .pipe($.revReplace())
    .pipe(gulp.dest('./build/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./build/'));
});

// Cleanup
gulp.task('cleanup', ['rev'], function() {
  var manifest = require('./build/rev-manifest.json');
  var files = Object.keys(manifest).map(function(path) {
    return 'build/' + path;
  });

  files.push('./build/rev-manifest.json');

  require('del')(files, function() {});
});

// Assets
gulp.task('assets', ['styles', 'scripts', 'images', 'replace', 'extras'], function() {
  if (ENV === 'production') {
    gulp.start(['cleanup']);
  }
});

// BrowserSync
gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: ['build']
    }
  });
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles']);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['src/images/**/*'], ['images', reload]);
  gulp.watch(['src/**/*.{html,txt,json}'], ['replace', reload]);
});

// Build
gulp.task('build', ['clean'], function() {
  gulp.start('assets');
});

// Serve
gulp.task('serve', function() {
  return gulp.start(['build', 'watch']);
});

// Deploy
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe($.ghPages());
});

// Default
gulp.task('default', ['build']);
