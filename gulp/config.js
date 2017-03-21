'use strict';

const notify        = require('gulp-notify');
const Webpack       = require('webpack');
const webpackConfig = require('../webpack.config.js');

// Autoprefixer options
const browsers = ['last 100 versions'];

// Configure error handling
const plumberOptions = {
  errorHandler: notify.onError('Error: <%= error.message %>')
};

// Path to the file with chunks data
const chunkManifestPath = '../../www/webpack-chunk-manifest.json';

// Set env
const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_DEP = process.env.NODE_DEP || 'livereload';

// Prod/dev variables for different bundles
const development = NODE_ENV == 'development';
const production = NODE_ENV == 'production';
const livereload = NODE_DEP == 'livereload';
const deployment = NODE_DEP == 'deployment';

// Ftp settings
const user = process.env.FTP_USER;
const password = process.env.FTP_PWD;
const host = '255.255.255.255';
const port = 21;
const localFilesGlob = ['www/**/*'];
const remoteFolder = 'path/to/ftp';

// Configure tasks
const jsTask = 'webpack';
const htmlTask = production ? 'pug_compile' : 'watch-html';
const cssTask = production ? 'css' : 'watch-css';
const svgTask = production ? 'svg' : 'watch-svg';

module.exports = {
  development,
  production,
  livereload,
  deployment,

  tasksArray: [svgTask, jsTask, cssTask, htmlTask],
  webpackConfig,
  browsers,
  chunkManifestPath,
  plumberOptions,

  ftp: {
    user,
    password,
    host,
    port,
    localFilesGlob,
    remoteFolder,
  }
};