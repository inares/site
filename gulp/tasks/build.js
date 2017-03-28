var gulp          = require("gulp");
var isProduction  = require("../util/getArgs").isProduction;
var sequence      = require("run-sequence");

gulp.task("build", function(done) {
  if( isProduction ) {
    sequence("clean", "jekyll-build", "sass", "javascript"/*, "analytics"*/, "copy-validation", "rev:collect", done);
  } else {
    sequence("clean", "jekyll-build", "sass", "javascript"/*, "analytics"*/, "copy", done);
  }
});
