/*eslint-env node*/
// var $             = require("gulp-load-plugins")();
const fs            = require('fs');
const pump          = require('pump');
const util          = require('util');
const gulpIf        = require('gulp-if');
const uglify        = require('gulp-uglify');
const request       = require('request');
const download      = require("gulp-download");
const browserSync   = require("browser-sync");
const rename        = require("gulp-rename");
const concat        = require("gulp-concat");
const gulp          = require("gulp");

const closure       = require("gulp-google-closure-compiler-post");

const config        = require("../util/loadConfig");
const isProduction  = require("../util/getArgs").isProduction;
// const args        = require("../util/getArgs");

const millisecondsPerDay = 24 * 60 * 60 * 1000;



gulp.task("javascript", function(done) {
  var remains = 0;

  var configJ = config.javascript;
  var configA = isProduction ? config.analytics.prod : config.analytics.debug;

  function completed( a, b ) {  /*for "pump" */
    if (--remains===0 || a)  done( a, b );
  }

  browserSync.notify( configJ.notification );


  /* Download Google Analytics if needed */
  var analyticsDestPath = configJ.dest.buildJSDir + configA.name;

  var diffDays = 99;
  if( fs.existsSync(analyticsDestPath) ) {
    var stats = fs.statSync( analyticsDestPath );
    var mtime = new Date( util.inspect(stats.mtime) );
    diffDays  = ((new Date()) - mtime) / millisecondsPerDay;
  }

  if( diffDays > 7 ) {
    remains++;
    pump( [
        download( [configA.src] ),
        rename( configA.name ),
        gulp.dest( configJ.dest.buildJSDir )
      ], completed );
  }


  /* Concatenation of JS source files and minification */
  remains++;
  pump( [
    gulp.src(configJ.src),
    concat(configJ.filename_concat),
    gulp.dest(configJ.dest.buildJSDir),
    // uglify({ mangle: {keep_fnames: false}, compress: {unused: false, keep_fnames: false}, report: "min", preserveComments: false }),
    closure( {jsExterns: 'window.ga;ga;YT.Player;onYouTubeIframeAPIReady;loadOK;'} ),
    rename(configJ.filename_concat_min),
    gulp.dest(configJ.dest.buildJSDir)
  ], completed );

  /* Concatenation with Google Analytics */
  remains++;
  pump( [
    gulp.src( [configJ.dest.buildJSDir+configJ.filename_concat_min, analyticsDestPath] ),
    concat(configJ.filename_all),
    gulp.dest(configJ.dest.buildJSDir),
    gulpIf( !isProduction, gulp.dest(configJ.dest.siteJSDir) )
  ], completed );
  return;

});
