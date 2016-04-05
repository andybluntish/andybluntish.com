/* node: true */
'use strict';

const isProduction = process.env.NODE_ENV === 'production';
const paths = {};
paths.src = 'src';
paths.dest = 'dist';
paths.assets = `${paths.dest}/assets`;

const gulp = require('gulp');
const rimraf = require('rimraf');
const cp = require('child_process');
const runSequence = require('run-sequence');


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
   Build
   ========================================================================== */

gulp.task('build', (done) => {
  return runSequence('clean', ['content'], done);
});


/* ==========================================================================
   Default
   ========================================================================== */

gulp.task('default', ['build']);
