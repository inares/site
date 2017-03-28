const PluginError = require('gulp-util').PluginError;
// const Transform   = require('transform');
const Transform   = require('readable-stream/transform')
const request     = require('request');
const fs          = require('fs');

const PLUGIN_NAME = "gulp-google-closure-compiler-post"

// http://closure-compiler.appspot.com/home


// fs.readFile( 'assets/js/main.js', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   requestCompile( data );
// } );


module.exports = function() {
  // Monkey patch Transform or create your own subclass,
  // implementing `_transform()` and optionally `_flush()`
  var transformStream = new Transform({objectMode: true});
  /**
   * @param {Buffer|string} file
   * @param {string=} encoding - ignored if file contains a Buffer
   * @param {function(Error, object)} callback - Call this function (optionally with an
   *          error argument and data) when you are done processing the supplied chunk.
   */
  transformStream._transform = function( file, encoding, callback ) {
    if( file.isNull() ) {
      return callback( null, file );
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      // this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      callback( new PluginError(PLUGIN_NAME, 'Streaming not supported') );
    } else if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      // this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
    }

    var formData = {
      output_format: 'json',
      output_info: ['warnings', 'errors', 'statistics', 'compiled_code'],
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      warning_level: 'verbose',
      js_externs: 'window.ga, ga, onYouTubeIframeAPIReady, loadOK',
      js_code: String(file.contents)
    };

    var options = {
      form: formData, qsStringifyOptions: {arrayFormat: 'repeat'}
    }

    request.post( 'https://closure-compiler.appspot.com/compile', options, function(err, res, body) {
      if( err ) {
        console.log( 'Error !' );
        console.log( err );
        return callback(err);
      }
      if( res.statusCode == 200 ) {
        var myJSON = JSON.parse(body);

        if( myJSON.hasOwnProperty('serverErrors') ) {
          console.log( 'Error !' );
          console.log( myJSON.serverErrors );
          return callback(myJSON.serverError);
        } else {
          console.log( myJSON.statistics );
          file.contents = new Buffer(myJSON.compiledCode);
          return callback( null, file );
        }
      }
    });

    // callback(error);
  };

  return transformStream;
};