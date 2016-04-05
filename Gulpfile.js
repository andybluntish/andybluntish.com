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
const autoprefixer = require('gulp-autoprefixer');


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
  const input  = `${paths.dest}/**/*.css`;
  const output = paths.dest;

  return gulp.src(input)
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
});


/* ==========================================================================
   Build
   ========================================================================== */

gulp.task('build', (done) => {
  return runSequence('clean', 'content', ['styles'], done);
});


/* ==========================================================================
   Default
   ========================================================================== */

gulp.task('default', ['build']);
