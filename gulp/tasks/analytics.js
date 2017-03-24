var gulp          = require("gulp");
var gulpif        = require("gulp-if");
var rename        = require("gulp-rename");
var download      = require("gulp-download");
var config        = require("../util/loadConfig").analytics;
var isProduction  = require("../util/isProduction");


gulp.task("analytics", function(done) {
  if( isProduction ) {
    return download(config.src.url_prod)
           .pipe(rename(config.dest.name))
           .pipe( gulp.dest(config.dest.jekyllRoot) );
  } else {
    return download(config.src.url_debug)
           .pipe(rename(config.dest.name))
           .pipe( gulp.dest(config.dest.jekyllRoot) );
  }
  
  // return gulpif( isProduction, download(config.src.url_prod) )
         // .pipe( gulpif( ! isProduction, download(config.src.url_debug) ) )
         // .on("end", function(){ console.log(isProduction); })
         // .pipe( rename(config.dest.name) )
         // .pipe( gulp.dest(config.dest.jekyllRoot) );
  
});
