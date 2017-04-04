var browserSync   = require("browser-sync");
var config        = require("../util/loadConfig").jekyll;
var gulp          = require("gulp");
var isProduction  = require("../util/getArgs").isProduction;
var spawn         = require("cross-spawn");

gulp.task("jekyll-build", function(done) {
  browserSync.notify( config.notification );

  if( isProduction ) {
    spawn("bundle", ["exec", "jekyll", "build"], {stdio: "inherit"}).on("close", done);  // Spawn jekyll commands
  } else {
    spawn("bundle", ["exec", "jekyll", "build", "--config", "_config.yml,_config.dev.yml"], {stdio: "inherit"}).on("close", done);  // Spawn jekyll commands
  }

  return;
});
