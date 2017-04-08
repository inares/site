/*eslint-env node*/
/* global casper */

var pageUrl = 'http://localhost:8080' /*'https://inares-site-home-inares.c9users.io/'*/;

casper.test.begin( "Testing home page for Desktop", 1, function(test) {
  casper.options.viewportSize = {width: 1600, height: 1200};

  casper
    .start( pageUrl )
    .then(function () {
      this.wait( 1000 );
    })
    .then(function () {
      this.echo( 'YouTube', 'COMMENT' );
      test.assertExists( 'iframe#player', 'YouTube iframe exists' );
    })
    .run(function () {
      test.done();
    });
});



casper.test.begin( "Testing home page for Mobile", 1, function(test) {
  casper.options.viewportSize = {width: 480, height: 320};

  casper
    .start( pageUrl )
    .then(function () {
    })
    .then(function () {
      this.echo( 'YouTube', 'COMMENT' );
      test.assertDoesntExist( 'iframe#player', 'YouTube iframe does not exists' );
    })
    .run(function () {
      test.done();
    });
});
