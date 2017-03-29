var browserSync = require("browser-sync");
var config      = require("../util/loadConfig");
var gulp        = require("gulp");

// Watch files for changes, recompile/rebuild and reload the browser
gulp.task("watch", function() {
  gulp.watch(config.watch.pages, ["build", browserSync.reload]);
  gulp.watch(config.javascript.src, ["javascript", browserSync.reload]);
  // No browser reload needed here, browserSync injects the stylesheet into browsers
  gulp.watch(config.sass.src, ["sass"]);
  gulp.watch(config.watch.images, ["copy", browserSync.reload]);
  gulp.watch(config.watch.plugins, ["build", browserSync.reload]);
});
