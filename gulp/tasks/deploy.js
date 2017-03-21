'use strict';

const gulp   = require('gulp');
const gutil  = require('gulp-util');
const ftp    = require('vinyl-ftp');
const config = require('../config');

// vars for server connection and deploy task
const user = config.ftp.user;
const password = config.ftp.password;
const host = config.ftp.host;
const port = config.ftp.port;
const localFilesGlob = config.ftp.localFilesGlob;
const remoteFolder = config.ftp.remoteFolder;

// build an FTP connection
function getFtpConnection() {
  return ftp.create({
    host,
    port,
    user,
    password,
    parallel: 5,
    log: gutil.log
  });
}

// upload files to the server on every file change in www/
gulp.task('ftp-deploy-watch', () => {
  let conn = getFtpConnection();

  gulp.watch(localFilesGlob)
    .on('change', function (event) {
      console.log('Изменения в файле "' + event.path + '", ' + event.type);
      return gulp.src([event.path], {base: '.', buffer: false})
        .pipe(plumber(config.plumberOptions))
        .pipe(conn.newer(remoteFolder))
        .pipe(conn.dest(remoteFolder));
    });
});