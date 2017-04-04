var gulp          = require("gulp");
var isProduction  = require("../util/getArgs").isProduction;
var sequence      = require("run-sequence");

gulp.task("build", function(done) {
  if( isProduction ) {
    sequence("clean", "images:thumb", "images:optimize", "jekyll-build", "sass", "javascript"/*, "analytics"*/, "copy-validation", "rev:collect", done);
  } else {
    sequence("clean", "images:thumb", "images:optimize", "jekyll-build", "sass", "lint-css", "javascript"/*, "analytics"*/, "copy", done);
  }
});
