const gulp = require("gulp");

gulp.task("build", function(done) {
  const sequence     = require("run-sequence");
  const isProduction = require("../util/getArgs").isProduction;

  if( isProduction ) {
    sequence("clean", "sass", "jekyll-build", "javascript", "copy-validation", "rev:collect", done);
  } else {
    sequence("images:thumb", "images:optimize", "sass", "jekyll-serve", "javascript", "copy", "lint-css"/*, "browser-sync"*/, "watch", done);
  }
});

gulp.task('default', ['build']);


gulp.task("travis", function(done) {
  const sequence     = require("run-sequence");
  const isProduction = require("../util/getArgs").isProduction;

  sequence("sass", "jekyll-travis", "javascript", "copy-validation", "rev:collect", "lint-css", done);
});
