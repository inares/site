/*eslint-env node*/
const gulp = require("gulp");


gulp.task("javascript", function(done) {
  const fs            = require('fs');
  const pump          = require('pump');
  const util          = require('util');
  // const gulpIf        = require('gulp-if');
  const addsrc        = require('gulp-add-src');
  // const uglify        = require('gulp-uglify');
  const request       = require('request');
  const browserSync   = require("browser-sync");
  const rename        = require("gulp-rename");
  const concat        = require("gulp-concat");

  const closure       = require("gulp-google-closure-compiler-post");

  const config        = require("../util/loadConfig");
  const args          = require("../util/getArgs");

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const closureOpt         = {jsExterns: 'window.ga;ga;YT.Player;onYouTubeIframeAPIReady;loadOK;player.mute;player.setVolume;player.playVideo'};

  var diffDays = 99;
  var configJ  = config.javascript;
  var configA  = args.isProduction ? config.analytics.prod : config.analytics.debug;

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
        // .pipe(gulpIf(!args.isProduction, gulp.dest(configJ.dest.siteJSDir)))
        .on('end', done);
    }

    if( diffDays > 7 ) {
      download( configA.src, analyticsDestPath, doWork );
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
      gulp.dest(configJ.dest.buildJSDir),
      // gulpIf(!args.isProduction, gulp.dest(configJ.dest.siteJSDir))
    ], done );
  }

});
