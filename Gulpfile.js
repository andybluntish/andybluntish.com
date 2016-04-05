/* node: true */
'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  src: 'src',
  dest: 'dist'
};

const gulp = require('gulp');
const rimraf = require('rimraf');
const cp = require('child_process');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
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


/* ==========================================================================
   Images
   ========================================================================== */

gulp.task('images', () => {
  const input  = `${paths.src}/_img/*.{svg,png,jpg,gif}`;
  const output = `${paths.dest}/img`;

  return gulp.src(input)
    .pipe(gulp.dest(output));
});


/* ==========================================================================
   Build
   ========================================================================== */

gulp.task('build', (done) => {
  return runSequence('clean', 'content', ['styles', 'images'], done);
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
  gulp.watch(`${paths.src}/**/*.scss`, ['styles']);
  gulp.watch(`${paths.src}/_img/**/*.{svg,jpg,png,gif}`, ['images', browserSync.reload]);
});


/* ==========================================================================
   Default
   ========================================================================== */

gulp.task('default', ['build']);
