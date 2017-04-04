const gulp = require("gulp");


gulp.task("copy", function() {
  const browserSync   = require("browser-sync");
  const config        = require("../util/loadConfig");
  const addsrc        = require('gulp-add-src');
  const gulpIf        = require('gulp-if');
  const isProduction  = require("../util/getArgs").isProduction;
  const fs            = require('fs');
  const path          = require('path')

  const mkdirSync = function (dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  }

  const mkdirpSync = function (dirPath) {
    const parts = dirPath.split(path.sep)

    // For every part of our path, call our wrapped mkdirSync()
    // on the full path until and including that part
    for( var i = 1; i <= parts.length; i++ ) {
      mkdirSync( path.join.apply(null, parts.slice(0, i)) )
    }
  }

  browserSync.notify(config.copy.notification);

  var srcJS  = config.javascript.dest.buildJSDir + config.javascript.filename_all;
  var srcCSS = config.sass.dest.buildSASSDir + config.sass.dest.filename;

  var destJS  = config.copy.dest + 'js/'  + config.javascript.filename_all;
  var destCSS = config.copy.dest + 'css/' + config.sass.dest.filename;

  mkdirpSync( config.copy.dest + 'js/'  );
  mkdirpSync( config.copy.dest + 'css/' );

  fs.createReadStream(srcJS ).pipe( fs.createWriteStream(destJS ) );
  fs.createReadStream(srcCSS).pipe( fs.createWriteStream(destCSS) );

  return gulp.src(config.copy.assets)
    // Write to build dir only for development builds
    // For production builds the revision task writes the assets into the build dir
    .pipe(gulpIf(!isProduction, gulp.dest(config.copy.dest)));
});



