const gulp = require('gulp');


gulp.task( 'lint-css', function lintCssTask(done) {
  const config        = require("../util/loadConfig");
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