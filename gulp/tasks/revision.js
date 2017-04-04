var collect       = require("gulp-rev-collector");
var config        = require("../util/loadConfig");
var gulp          = require("gulp");
var rev           = require("gulp-rev");

// Revision asset files in the source dir and write the rev-manifest.json
gulp.task("revision", function() {
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
  return gulp.src(config.revision.collect.src)
  .pipe(collect())
  .pipe(gulp.dest(config.revision.collect.dest));
});
