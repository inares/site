var $             = require("gulp-load-plugins")();
var browserSync   = require("browser-sync");
var config        = require("../util/loadConfig").copy_validation;
var gulp          = require("gulp");
var isProduction  = require("../util/isProduction");

gulp.task("copy-validation", function() {
  browserSync.notify( config.notification );
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
