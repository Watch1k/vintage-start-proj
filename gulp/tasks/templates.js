'use strict';

const gulp    = require('gulp');
const pug     = require('gulp-pug');
const plumber = require('gulp-plumber');
const config  = require('../config');

function compileHtml(src, dest) {
  pugOptions.data = {
    webpackManifest: require(config.chunkManifestPath)
  };

  return gulp.src([src])
    .pipe(plumber(config.plumberOptions))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(dest));
}

let pugOptions = {
  pretty: false,
  nspaces: 4,
  tabs: true,
  donotencode: true
};

if (config.production) pugOptions.pretty = true;

//compile .pug to .html
gulp.task('pug_compile', () => compileHtml('src/template/pages/*.pug', './www/'));

// watch .pug files
gulp.task('watch-html', () => {
  gulp.watch('src/template/**/*.pug', ['pug_compile']);
});

// watch webpack-chunk-manifest
gulp.task('watch-chunk', () => {
  gulp.watch('./www/webpack-chunk-manifest.json', ['pug_compile']);
});