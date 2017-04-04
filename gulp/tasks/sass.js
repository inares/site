const gulp = require("gulp");

gulp.task("sass", function() {
  const $             = require("gulp-load-plugins")();
  const autoprefixer  = require("gulp-autoprefixer");
  const browserSync   = require("browser-sync");
  const config        = require("../util/loadConfig").sass;
  const isProduction  = require("../util/getArgs").isProduction;
  const sass          = require("gulp-sass");
  const gulpStylelint = require('gulp-stylelint');

  browserSync.notify(config.notification);
  var minifycss = $.if(isProduction, $.cssnano());

  return gulp.src(config.src)
    .pipe($.sourcemaps.init())
    .pipe($.sass()
      .on("error", $.sass.logError))
    .pipe(autoprefixer(config.compatibility))
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    // Write the file to source dir, it's the source for the revision task!
    .pipe(gulp.dest(config.dest.buildSASSDir));

    // Write to build dir only for development builds
    // For production builds the revision task writes the assets into the build dir
    // .pipe($.if(!isProduction, gulp.dest(config.dest.siteSASSDir)))
    // Auto-inject styles into browsers
    // .pipe(browserSync.stream());
});
