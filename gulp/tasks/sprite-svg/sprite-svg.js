'use strict';

const gulp        = require('gulp');
const consolidate = require('gulp-consolidate');
const cheerio     = require('gulp-cheerio');
const plumber     = require('gulp-plumber');
const svgmin      = require('gulp-svgmin');
const svgStore    = require('gulp-svgstore');
const rename      = require('gulp-rename');
const through2    = require('through2');
const runSequence = require('run-sequence');
const config      = require('../../config');

gulp.task('svg', function() {
  return gulp
    .src('src/svg/*.svg')
    .pipe(plumber(config.plumberOptions))
    .pipe(svgmin({
      plugins: [{
        removeDesc: true
      }, {
        cleanupIDs: true
      }, {
        mergePaths: false
      }]
    }))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(through2.obj(function(file, encoding, cb) {
      const $ = file.cheerio;
      const data = $('svg > symbol').map(function() {
        const $this  = $(this);
        const size   = $this.attr('viewBox').split(' ').splice(2);
        const name   = $this.attr('id');
        const ratio  = size[0] / size[1]; // symbol width / symbol height
        const fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
        const cssClass = $this.find('[class]');
        const stroke = $this.find('[stroke]').attr('stroke');

        if (cssClass) {
          cssClass.removeAttr('class');
          $this.find('style').remove();
        }

          return {
            name,
            ratio: +ratio.toFixed(2),
            stroke: stroke || 'initial',
            fill: fill || 'currentColor'
          };
      }).get();

      this.push(file);

      gulp.src(__dirname + `/_svg.scss`)
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(gulp.dest('src/styles/partials'));

      gulp.src(__dirname + '/svg')
        .pipe(consolidate('lodash', {
          symbols: data
        }))
        .pipe(gulp.dest('src/template/partials/svg'));
      cb();
    }))
    .pipe(cheerio({
      run: function($, file) {
        $('[fill]:not([fill="currentColor"])').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename({ basename: 'sprite' }))
    .pipe(gulp.dest('src/template/partials'));
});

gulp.task('watch-svg', function() {
  gulp.watch('src/svg/*.svg', () => runSequence('svg', 'pug_compile'));
});
