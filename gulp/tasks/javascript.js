/*eslint-env node*/
// var $             = require("gulp-load-plugins")();
const fs            = require('fs');
// const http          = require('http');
const pump          = require('pump');
const util          = require('util');
const gulpIf        = require('gulp-if');
const addsrc        = require('gulp-add-src');
// const uglify        = require('gulp-uglify');
const request       = require('request');
// const download      = require("gulp-download");
const browserSync   = require("browser-sync");
const rename        = require("gulp-rename");
const concat        = require("gulp-concat");
const gulp          = require("gulp");

const closure       = require("gulp-google-closure-compiler-post");

const config        = require("../util/loadConfig");
const args          = require("../util/getArgs");

const millisecondsPerDay = 24 * 60 * 60 * 1000;
const closureOpt         = {jsExterns: 'window.ga;ga;YT.Player;onYouTubeIframeAPIReady;loadOK;player.mute;player.setVolume;player.playVideo'};


gulp.task("javascript", function(done) {
  // var remains = 0;

  var diffDays = 99;
  var configJ  = config.javascript;
  var configA  = args.isProduction ? config.analytics.prod : config.analytics.debug;

  // function completed( a, b ) {  /*for "pump" */
  //   if (--remains===0 || a)  done( a, b );
  // }

  // var download = function( url, dest, cb ) {
  //   var file = fs.createWriteStream(dest);
  //   request = http.get(url, function(response) {
  //     response.pipe(file);
  //     file.on('finish', function() {
  //       file.close(cb);  // close() is async, call cb after close completes.
  //     });
  //   }).on('error', function(err) { // Handle errors
  //     fs.unlink(dest); // Delete the file async. (But we don't check the result)
  //     if (cb) cb(err.message);
  //   });
  // };

  if( args.isAnalytics ) {
    var download = function(url, dest, cb) {
      var file = fs.createWriteStream(dest);
      var sendReq = request.get(url);
      console.log( "Downloading: " + url );

      // verify response code
      sendReq.on('response', function(response) {
        if (response.statusCode !== 200) {
          return cb('Response status was ' + response.statusCode);
        }
      });

      // check for request errors
      sendReq.on('error', function (err) {
        fs.unlink(dest);
        return cb(err.message);
      });

      sendReq.pipe(file);

      file.on('finish', function() {
        return file.close(cb);  // close() is async, call cb after close completes.
      });

      file.on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
      });
    };

    browserSync.notify( configJ.notification );


    /* Download Google Analytics if needed */
    var analyticsDestPath = configJ.dest.buildJSDir + configA.name;

    if( fs.existsSync(analyticsDestPath) ) {
      var stats = fs.statSync( analyticsDestPath );
      var mtime = new Date( util.inspect(stats.mtime) );
      diffDays  = ((new Date()) - mtime) / millisecondsPerDay;
    }

    function doWork( err ) {
      if( err !== undefined && err !== null ) {
        return done(err);
      }
      gulp.src(configJ.src)
        .pipe(addsrc.append(analyticsDestPath))
        .pipe(concat(configJ.filename_concat))
        .pipe(gulp.dest(configJ.dest.buildJSDir))
        .pipe(closure( closureOpt ))
        .pipe(rename(configJ.filename_all))
        .pipe(gulp.dest(configJ.dest.buildJSDir))
        .pipe(gulpIf(!args.isProduction, gulp.dest(configJ.dest.siteJSDir)))
        .on('end', done);
    }

    if( diffDays > 7 ) {
      download( configA.src, analyticsDestPath, doWork );
      // var file = fs.createWriteStream( analyticsDestPath );
      // var request = http.get( configA.src, function(response) {
      //   response.pipe(file);
      // } );
      // remains++;
      // pump( [
      //     download( [configA.src] ),
      //     rename( configA.name ),
      //     gulp.dest( configJ.dest.buildJSDir )
      //   ], completed );
    } else {
      return doWork();
    }
  } else {
    pump( [
      gulp.src(configJ.src),
      concat(configJ.filename_concat),
      gulp.dest(configJ.dest.buildJSDir),
      // uglify({ mangle: {keep_fnames: false}, compress: {unused: false, keep_fnames: false}, report: "min", preserveComments: false }),
      closure( closureOpt ),
      rename(configJ.filename_all),
      // rename(configJ.filename_concat_min),
      gulp.dest(configJ.dest.buildJSDir),
      gulpIf(!args.isProduction, gulp.dest(configJ.dest.siteJSDir))
    ], done );
  }


  /* Concatenation of JS source files and minification */
  // if( false ) {
  // remains++;
  // pump( [
  //   gulp.src(configJ.src),
  //   addsrc.append(analyticsDestPath),
  //   concat(configJ.filename_concat),
  //   gulp.dest(configJ.dest.buildJSDir),
  //   // uglify({ mangle: {keep_fnames: false}, compress: {unused: false, keep_fnames: false}, report: "min", preserveComments: false }),
  //   closure( {jsExterns: 'window.ga;ga;YT.Player;onYouTubeIframeAPIReady;loadOK;player.mute;player.setVolume;player.playVideo'} ),
  //   rename(configJ.filename_all),
  //   // rename(configJ.filename_concat_min),
  //   gulp.dest(configJ.dest.buildJSDir)
  // ], completed );
  // }

  // return gulp.src(configJ.src)
  //   .pipe(addsrc.append(analyticsDestPath))
  //   .pipe(concat(configJ.filename_concat))
  //   .pipe(gulp.dest(configJ.dest.buildJSDir))
  //   .pipe(closure( {jsExterns: 'window.ga;ga;YT.Player;onYouTubeIframeAPIReady;loadOK;player.mute;player.setVolume;player.playVideo'} ))
  //   .pipe(rename(configJ.filename_all))
  //   .pipe(gulp.dest(configJ.dest.buildJSDir))
  //   .pipe(gulpIf(!isProduction, gulp.dest(configJ.dest.siteJSDir)));

  /* Concatenation with Google Analytics */
  // remains++;
  // pump( [
  //   gulp.src( [configJ.dest.buildJSDir+configJ.filename_concat_min, analyticsDestPath] ),
  //   concat(configJ.filename_all),
  //   gulp.dest(configJ.dest.buildJSDir),
  //   gulpIf( !isProduction, gulp.dest(configJ.dest.siteJSDir) )
  // ], completed );
  // return;

});
