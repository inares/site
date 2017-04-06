const gulp = require("gulp");


// Revision asset files in the source dir and write the rev-manifest.json
gulp.task("revision", function() {
  const config = require("../util/loadConfig");
  const rev    = require("gulp-rev");

  var srcJS  = config.javascript.dest.buildJSDir + config.javascript.filename_all;
  var srcCSS = config.sass.dest.buildSASSDir + config.sass.dest.filename;

  var gulpSrc = config.revision.sources.src;
  gulpSrc.push(srcJS);
  gulpSrc.push(srcCSS);

  return gulp.src(gulpSrc, {base: "assets"})
    .pipe(rev())
    // Write revised assets into the build dir
    .pipe(gulp.dest(config.revision.sources.dest))
    .pipe(rev.manifest())
    // Write rev-manifest.json to jekyll root
    .pipe(gulp.dest(config.revision.sources.manifest.dest));
});


// Replace links to assets in files (build dir) from the rev-manifest.json
gulp.task("rev:collect", ["revision"], function() {
  const collect = require("gulp-rev-collector");
  const config  = require("../util/loadConfig");

  return gulp.src(config.revision.collect.src)
  .pipe(collect())
  .pipe(gulp.dest(config.revision.collect.dest));
});
