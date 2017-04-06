const gulp = require("gulp");


gulp.task("sass", function() {
  const autoprefixer  = require("gulp-autoprefixer");
  // const browserSync   = require("browser-sync");
  const config        = require("../util/loadConfig").sass;
  const isProduction  = require("../util/getArgs").isProduction;
  const sass          = require("gulp-sass");
  // const cssnano       = require("gulp-cssnano");
  const sourcemaps    = require("gulp-sourcemaps");
  const gulpIf        = require('gulp-if');
  const cleanCSS      = require('gulp-clean-css');
  // const gulpStylelint = require('gulp-stylelint');

  // browserSync.notify(config.notification);
  // var minifycss = gulpIf(isProduction, cssnano());

  return gulp.src(config.src)
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer(config.compatibility))
    // .pipe(minifycss)
    .pipe(cleanCSS({compatibility: '*', level: {2: {all: false}}}))
    .pipe(gulpIf(!isProduction, sourcemaps.write()))
    // Write the file to source dir, it's the source for the revision task!
    .pipe(gulp.dest(config.dest.buildSASSDir))
    .pipe(gulp.dest(config.dest.jekyllInclude));

    // Write to build dir only for development builds
    // For production builds the revision task writes the assets into the build dir
    // .pipe(gulpIf(!isProduction, gulp.dest(config.dest.siteSASSDir)))
    // Auto-inject styles into browsers
    // .pipe(browserSync.stream());
});
