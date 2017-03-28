var gulp         = require("gulp");
var sequence     = require("run-sequence");
var isProduction = require("../util/getArgs").isProduction;

gulp.task("default", function(done) {
  if( isProduction ) {
    sequence("build", done);
  } else {
    sequence("build", "browser-sync", "watch", done);
  }
});
