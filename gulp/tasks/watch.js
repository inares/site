const gulp = require("gulp");

// Watch files for changes, recompile/rebuild and reload the browser
gulp.task("watch", function() {
  // const browserSync = require("browser-sync");
  const config   = require("../util/loadConfig");
  const sequence = require("run-sequence");

  gulp.watch( config.watch.pages, function () {
      return sequence( "jekyll-build", "copy"/*, browserSync.reload*/ );
    } );

  gulp.watch( config.javascript.src, function () {
      return sequence( "javascript", "copy"/*, browserSync.reload*/ );
    } );

  gulp.watch( config.sass.src, function () {
      return sequence( "sass", "copy"/*, browserSync.reload*/ );
    } );

  // gulp.watch(config.watch.pages, ["jekyll-build"/*, browserSync.reload*/]);
  gulp.watch(config.watch.images, ["copy"/*, browserSync.reload*/]);
  gulp.watch(config.watch.plugins, ["jekyll-build"/*, browserSync.reload*/]);
});
