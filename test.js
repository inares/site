// http://stackoverflow.com/questions/17121846/node-js-how-to-send-headers-with-form-data-using-request-module

const request = require('request');
const fs      = require('fs');



fs.readFile( 'assets/js/main.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  requestCompile( data );
} );


function requestCompile( data ) {
  var formData = {
    output_format: 'json',
    output_info: ['warnings', 'errors', 'statistics', 'compiled_code'],
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    warning_level: 'verbose',
    js_externs: 'window.ga, ga, onYouTubeIframeAPIReady, loadOK',
    js_code: data
  };

  var options = {
    form: formData, qsStringifyOptions: {arrayFormat: 'repeat'}
  }

  request.post( 'https://closure-compiler.appspot.com/compile', options, function(err, res, body) {
    if( err ) {
      return console.log( err );
    }
    if( res.statusCode == 200 ) {
      var myJSON = JSON.parse(body);

      if( myJSON.hasOwnProperty('serverErrors') ) {
        console.log( 'Error !' );
        console.log( myJSON.serverErrors );
      } else {
        console.log( myJSON );
      }
    }
  });
}

// request({
//     headers: {
//       'Content-Length': contentLength,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     uri: 'https://closure-compiler.appspot.com/compile',
//     body: formDataQ,
//     method: 'POST'
//   }, function (err, res, body) {
//     console.log( body );
//   });


