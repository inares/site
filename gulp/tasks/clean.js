const gulp    = require("gulp");

gulp.task("clean", function(done) {
  const config  = require("../util/loadConfig").clean;
  const del     = require("del");

  del(config);
  done();
});
