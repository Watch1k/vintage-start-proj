'use strict';

const gulp  = require('gulp');
const jsdoc = require('gulp-jsdoc3');

gulp.task('JSDocs', function (cb) {
  gulp.src(['README.md', './src/js/**/*.js'], { read: false })
    .pipe(jsdoc(cb));
});