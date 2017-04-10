// var browserSync   = require("browser-sync");
const gulp = require("gulp");


gulp.task("jekyll-build", function(done) {
  const isProduction = require("../util/getArgs").isProduction;
  const spawn        = require("cross-spawn");
  // browserSync.notify( config.notification );

  if( isProduction ) {
    spawn( "bundle", ["exec", "jekyll", "build"], {stdio: "inherit"} ).on("close", done);  // Spawn jekyll commands
  } else {
    spawn("bundle", ["exec", "jekyll", "build", "--config", "_config.yml,_config.dev.yml"], {stdio: "inherit"}).on("close", done);  // Spawn jekyll commands
  }

  return;
});


gulp.task("jekyll-serve", function(done) {
  const spawn = require("cross-spawn");
  spawn( "bundle", ["exec", "jekyll", "serve", "--no-watch", "--detach", "_config.yml,_config.dev.yml"], {stdio: "inherit"} );  // Spawn jekyll commands
  spawn( "sleep", ["1"], {stdio: "inherit"}).on("close", done);

  return;
});


gulp.task("jekyll-travis", function(done) {
  const spawn = require("cross-spawn");

  spawn( "bundle", ["exec", "jekyll", "serve", "--no-watch", "--detach", "_config.yml,_config.travis.yml"], {stdio: "inherit"} );  // Spawn jekyll commands
  spawn( "sleep", ["3"], {stdio: "inherit"}).on("close", done);

  return;
});
