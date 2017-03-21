'use strict';

const gulp           = require('gulp');
const plumber        = require('gulp-plumber');
const Webpack        = require('webpack');
const webpackStream = require('webpack-stream');
const config         = require('../config');
const webpackConfig  = config.webpackConfig;

// development - set watcher and it's options, add sourcemaps
if (config.development) {
  webpackConfig.watch = true;
  webpackConfig.watchOptions = { aggregateTimeout: 100 };
  webpackConfig.devtool = 'source-map';
}

// production - minify output file
if (config.production) {
  webpackConfig.plugins.push(
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { unsafe: true }
    })
  );
}

// run webpack
gulp.task('webpack', () => {
  return gulp.src('src/js/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, Webpack))
    .pipe(gulp.dest('www/'));
});