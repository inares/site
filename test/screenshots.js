var casper = require('casper').create();

var pageUrl = 'http://localhost:8080' /*'https://inares-site-home-inares.c9users.io/'*/,
    screenshotNow = new Date(),
    screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds()),
    viewports = [
      {
        'name': '7-smartphone-portrait',
        'viewport': {width: 320, height: 480}
      }, {
        'name': '6-smartphone-landscape',
        'viewport': {width: 480, height: 320}
      }, {
        'name': '3-tablet-portrait',
        'viewport': {width: 768, height: 1024}
      }, {
        'name': '5-tablet-landscape',
        'viewport': {width: 1024, height: 768}
      }, {
        'name': '4-desktop-1024',
        'viewport': {width: 1280, height: 800}
      }, {
        'name': '1-desktop-1366',
        'viewport': {width: 1366, height: 768}
      }, {
        'name': '2-desktop-1024',
        'viewport': {width: 1920, height: 1080}
      }
    ];


casper.start( pageUrl, function() {
  this.echo( 'Starting to capture screenshots' );
  this.echo( 'Page title: "' + this.getTitle() + '"' );
  this.wait( 1000 );
} );


casper.each(viewports, function(casper, viewport) {
  this.then(function() {
    this.viewport(viewport.viewport.width, viewport.viewport.height);
  });
  // this.thenOpen(screenshotUrl, function() {
  //   this.wait(100);
  //   this.echo( 'Page title: "' + this.getTitle() + '"' );
  // });
  this.then(function(){
    this.echo('Taking screenshot for ' + viewport.name + ' (' + viewport.viewport.width + 'x' + viewport.viewport.height + ')', 'info');
    this.capture('test/' + screenshotDateTime + '/' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png'
      //, {
        // top: 0,
        // left: 0,
        // width: viewport.viewport.width,
        // height: viewport.viewport.height
      // }
    );
  });
});

casper.run();

function pad(number) {
  var r = String(number);
  if ( r.length === 1 ) {
    r = '0' + r;
  }
  return r;
}
