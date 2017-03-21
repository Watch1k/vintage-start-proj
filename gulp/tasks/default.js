'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');
const config      = require('../config');

// livereload
if (config.livereload)
  config.tasksArray.push('livereload');

// ftp deployment
if (config.deployment)
  config.tasksArray.push('ftp-deploy-watch');

// update html on webpack-chunk-manifest change
if (!config.production)
  config.tasksArray.push('watch-chunk');

// default task
gulp.task('default', () => {
  config.production ? runSequence(...config.tasksArray) : runSequence(config.tasksArray)
});