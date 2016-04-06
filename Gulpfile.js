/* node: true */
'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  src: 'src',
  dest: 'dist'
};

const gulp = require('gulp');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const cp = require('child_process');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uncss = require('gulp-uncss');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const fs = require('fs');
const browserSync = require('browser-sync').create();


/* ==========================================================================
   Clean
   ========================================================================== */

gulp.task('clean', (done) => {
  rimraf(paths.dest, done);
});


/* ==========================================================================
   Content
   ========================================================================== */

gulp.task('content', (done) => {
  const cmd = 'bundle exec jekyll build'.split(' ');

  return cp.spawn(cmd.shift(), cmd, { stdio: 'inherit' }).on('close', done);
});

gulp.task('content:compress', () => {
  const input  = `${paths.dest}/**/*.html`;
  const output = paths.dest;

  return gulp.src(input)
    .pipe(htmlmin({
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
    }))
    .pipe(gulp.dest(output));
});


/* ==========================================================================
   Styles
   ========================================================================== */

gulp.task('styles', () => {
  const input  = `${paths.src}/_css/main.scss`;
  const output = `${paths.dest}/css`;

  return gulp.src(input)
    .pipe(sass({
      style: 'expanded',
      precision: 10,
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

gulp.task('styles:compress', () => {
  const input  = `${paths.dest}/**/*.css`;
  const output = paths.dest;
  const html   = `${paths.dest}/**/*.html`;

  return gulp.src(input)
    .pipe(uncss({ html: [html] }))
    .pipe(cleanCss())
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});


/* ==========================================================================
   Images
   ========================================================================== */

gulp.task('images', () => {
  const input  = `${paths.src}/_img/*.{svg,png,jpg,gif}`;
  const output = `${paths.dest}/img`;

  return gulp.src(input)
    .pipe(gulp.dest(output));
});

gulp.task('images:compress', () => {
  const input = `${paths.dest}/**/*.{svg,png,jpg,gif,ico}`;
  const output = paths.dest;

  return gulp.src(input)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    }))
    .pipe(gulp.dest(output));
});


/* ==========================================================================
   Icons
   ========================================================================== */

gulp.task('icons', () => {
  const input  = `${paths.src}/_icons/**/*.svg`;
  const output = 'img/icons.svg';

  return gulp.src(input)
    .pipe(svgstore())
    .pipe(rename(output))
    .pipe(cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
        $('symbol').each((i, el) => {
          const title = $(el).attr('id').replace('-', ' ');

          $(el)
            .attr('fill', 'currentColor')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .prepend(`<title>${title}</title>`);
        });
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('icons:inject', () => {
  const input  = `${paths.dest}/**/*.html`;
  const output = paths.dest;
  const iconsPath = `${paths.dest}/img/icons.svg`;
  const icons = fs.readFileSync(iconsPath);

  return gulp.src(input, { base: output })
    .pipe(cheerio({
      run: ($) => {
        $('body').prepend(String(icons));
        $('svg').first().attr('style', 'display: none');
      }
    }))
    .pipe(replace(/\/img\/icons.svg#/g, '#'))
    .pipe(gulp.dest(output));
});

gulp.task('icons:cleanup', () => {
  fs.unlinkSync(`${paths.dest}/img/icons.svg`);
});


/* ==========================================================================
   Compress
   ========================================================================== */

gulp.task('compress', (done) => {
  if (isProduction) {
    return runSequence([
      'content:compress',
      'styles:compress',
      'images:compress'
    ], 'icons:inject', 'icons:cleanup', 'compress:fingerprint', done);
  } else {
    done();
  }
});

gulp.task('compress:fingerprint', (done) => {
  return runSequence('compress:rev', 'compress:revreplace', 'compress:revcleanup', done);
});

gulp.task('compress:rev', () => {
  const input  = [
    `${paths.dest}/css/**/*`,
    `${paths.dest}/img/**/*`,
  ];
  const output = paths.dest;

  return gulp.src(input, { base: output })
    .pipe(rev())
    .pipe(gulp.dest(output))
    .pipe(rev.manifest())
    .pipe(gulp.dest(output));
});

gulp.task('compress:revreplace', () => {
  const input    = `${paths.dest}/**/*.html`;
  const output   = paths.dest;
  const manifest = gulp.src(`${paths.dest}/rev-manifest.json`);

  return gulp.src([input, `!${manifest}`])
    .pipe(revReplace({
      manifest: manifest,
      replaceInExtensions: ['.js', '.css', '.html', '.xml', '.json', '.txt']
    }))
    .pipe(gulp.dest(output));
});

gulp.task('compress:revcleanup', (done) => {
  const manifestPath = `${paths.dest}/rev-manifest.json`;
  const manifest     = require(`${__dirname}/${manifestPath}`);

  Object.keys(manifest).map((file) => {
    return `${paths.dest}/${file}`;
  }).concat(manifestPath).forEach((file) => {
    fs.unlinkSync(file);
  });

  done();
});


/* ==========================================================================
   Build
   ========================================================================== */

gulp.task('build', (done) => {
  return runSequence('clean', ['content', 'styles', 'images', 'icons'], 'compress', done);
});


/* ==========================================================================
   Server
   ========================================================================== */

gulp.task('serve', ['build'], () => {

  // Start BrowserSync server
  browserSync.init({
    open: false,
    notify: false,
    reloadOnRestart: true,
    server: {
      baseDir: paths.dest
    }
  });

  // Watch files, re-run the appropriate tasks, and reload the browser
  gulp.watch(`${paths.src}/**/*.{html,md,txt,json,xml,yml}`, ['content', browserSync.reload]);
  gulp.watch(`${paths.src}/_css/**/*.scss`, ['styles']);
  gulp.watch(`${paths.src}/_img/**/*.{svg,jpg,png,gif}`, ['images', browserSync.reload]);
  gulp.watch(`${paths.src}/_icons/**/*.svg`, ['icons', browserSync.reload]);
});


/* ==========================================================================
   Default
   ========================================================================== */

gulp.task('default', ['build']);
