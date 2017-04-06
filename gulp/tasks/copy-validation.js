const gulp = require("gulp");

gulp.task("copy-validation", function() {
  // const browserSync = require("browser-sync");
  const config      = require("../util/loadConfig").copy_validation;

  // browserSync.notify( config.notification );

  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
