/*
  ! ABANDONNÉ !
  Fusionné avec la tâche javascript
*/

const fs       = require('fs');
var pump       = require('pump');
const gulp     = require("gulp");
var util       = require('util');
const gulpif   = require("gulp-if");
const concat   = require("gulp-concat");
const rename   = require("gulp-rename");
const download = require("gulp-download");
const del      = require('del');
const config   = require("../util/loadConfig").analytics;
const args     = require("../util/getArgs");

const millisecondsPerDay = 24 * 60 * 60 * 1000;



gulp.task("analytics", function(cb) {
  // del(config.dest.jekyllRoot+config.dest.name).then(paths => {
  //   if( paths.length )
  //     console.log('Deleted files:\n', paths.join('\n'));
  // });

  var srcURL, destName, destPath;
  if( args.isProduction ) {
    srcURL   = config.src.url_prod;
    destName = config.dest.name_prod;
  } else {
    srcURL   = config.src.url_debug;
    destName = config.dest.name_debug;
  }
  destPath = config.dest.buildJSDir + destName;

  var diffDays = 99;
  if( fs.existsSync(destPath) ) {
    var stats = fs.statSync( destPath );
    var mtime = new Date( util.inspect(stats.mtime) );
    diffDays  = ((new Date()) - mtime) / millisecondsPerDay;
  }

  if( diffDays > 7 ) {
    pump( [
        download( srcURL ),
        rename( destName ),
        gulp.dest( config.dest.buildJSDir )
      ], cb );
  } else {
    return gulp.src('.');
  }


  // if( args.isProduction ) {
  //   // var vendorStyles =

  //   return download(config.src.url_prod)
  //         // .pipe(
  //         .pipe(rename(config.dest.name))
  //         .pipe( gulp.dest(config.dest.buildJSDir) );
  // } else if (args.isAnalytics) {
  //   return download(config.src.url_debug)
  //         .pipe(rename(config.dest.name))
  //         .pipe( gulp.dest(config.dest.buildJSDir) );
  // } else {
  //   // return nop();
  //   return gulp.src('.');
  // }

});
