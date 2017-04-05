const gulp            = require('gulp');


gulp.task( 'images:thumb', function(done) {
  const imagemin        = require('gulp-imagemin');
  const imageminGuetzli = require('imagemin-guetzli');
  const imageResize     = require('gulp-image-resize');
  const newer           = require('gulp-newer');
  const rename          = require("gulp-rename");

  const config          = require("../util/loadConfig");

  return gulp.src(config.image.thumb.original+'*')
    .pipe(rename(function(path) { path.basename += "-thumb"; }))
    .pipe(newer(config.image.buildImgDir))
    .pipe(imageResize({
        width:     480,
        crop:      false,
        upscale:   false,
        noProfile: true,
        format:    'jpg'
      }))
    .pipe(gulp.dest(config.image.thumb.reduced))
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(gulp.dest(config.image.buildImgDir));
} );


gulp.task( 'images:optimize', function(done) {
  const imagemin        = require('gulp-imagemin');
  const imageminGuetzli = require('imagemin-guetzli');
  const newer           = require('gulp-newer');

  const config          = require("../util/loadConfig");

  return gulp.src(config.image.src+'*')
    .pipe(newer(config.image.buildImgDir))
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(gulp.dest(config.image.buildImgDir));
} );