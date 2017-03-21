'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const config      = require('../config');

// initialize BS and watch changes
gulp.task('livereload', () => {
  browserSync.init({
    server: {
      baseDir: 'www'
    },
    reloadDebounce: 0,
    logPrefix: 'Vintage',
    notify: false
  });
  browserSync.watch('./www/**/*.*').on('change', browserSync.reload);
});
