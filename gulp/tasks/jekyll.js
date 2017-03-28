var browserSync   = require("browser-sync");
var config        = require("../util/loadConfig").jekyll;
var gulp          = require("gulp");
var isProduction  = require("../util/getArgs").isProduction;
var spawn         = require("cross-spawn");

gulp.task("jekyll-build", function(done) {
  browserSync.notify(config.notification);
  spawn("bundle", ["exec", "jekyll", "build"], {stdio: "inherit"}).on("close", done);  // Spawn jekyll commands
  return browserSync.reload();
});
