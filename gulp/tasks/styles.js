'use strict';

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const gulpif       = require('gulp-if');
const autoprefixer = require('autoprefixer');
const mqpacker     = require('css-mqpacker');
const config       = require('../config');

const extension = '{scss,sass}';

const processors = [
  autoprefixer({
    browsers: config.browsers,
    cascade: false
  }),
  mqpacker({
    sort: sortMediaQueries
  })
];

function compileCss(src, dest) {
  gulp.src(src)
    .pipe(plumber(config.plumberOptions))
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: config.production ? 'compressed' : 'expanded',
      precision: 5
    }))
    .pipe(postcss(processors))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(dest));
}

// default task
gulp.task('css', () => compileCss(`src/styles/index.${extension}`, './www/css/'));

// watch for changes
gulp.task('watch-css', () => {
  gulp.watch(`src/styles/**/*.${extension}`, ['css']);
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  const A = a.replace(/\D/g, '');
  const B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}