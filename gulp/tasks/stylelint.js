const gulp = require('gulp');
var config = require("../util/loadConfig");


gulp.task( 'lint-css', function lintCssTask(done) {
  const gulpStylelint = require('gulp-stylelint');
  const pump          = require('pump');

  pump( [
    // gulp.src( config.sass.dest.buildSASSDir + config.sass.dest.filename ),
    gulp.src( config.sass.src ),
    gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    })
  ], done );

  // return gulp.src( config.sass.dest.buildSASSDir + config.sass.dest.filename )
  //   .pipe(gulpStylelint({
  //     reporters: [
  //       {formatter: 'string', console: true}
  //     ]
  //   }));
} );