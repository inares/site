'use strict';

const PluginError = require('gulp-util').PluginError;
const Transform   = require('readable-stream/transform')
const request     = require('request');

const PLUGIN_NAME = "gulp-google-closure-compiler-post"

// http://closure-compiler.appspot.com/home

module.exports = function( opt ) {
  var transformStream = new Transform( {objectMode: true} );

  /**
   * @param {Buffer|string} filer
   * @param {string=} encoding - ignored if file contains a Buffer
   * @param {function(Error, object)} callback - Call this function (optionally with an
   *          error argument and data) when you are done processing the supplied chunk.
   */
  transformStream._transform = function( file, encoding, callback ) {
    if( file.isNull() ) {    // Nothing to do
      return callback( null, file );
    }

    if( file.isStream() ) {  // file.contents is a Stream
      return callback( new PluginError(PLUGIN_NAME, 'Streaming not supported') );
    }

    var optType    = typeof opt;
    var js_externs = '';

    if( opt !== undefined && opt !== null ) {
      // if( typeof opt !== 'string' ) {
      //   return callback( new PluginError(PLUGIN_NAME, 'The option (file path) must be a string') );
      // }
      var newFilePath = null;   // New file path if needed
      if( optType === 'string' && opt !== '' ) {
        newFilePath = opt;
      } else if (optType === 'object') {
        if( opt.path !== undefined && opt.path !== null && typeof opt.path === 'string' && opt.path !== '' ) {
          newFilePath = opt;
        }
        if( opt.js_externs !== undefined && opt.js_externs !== null && typeof opt.js_externs === 'string' && opt.js_externs !== '' ) {
          js_externs = opt.js_externs;
        }
      }

      if( newFilePath !== null ) {
        file.path = opt;
      }

      // if( opt !== '' ) {
      //   file.path = opt;
      // } else {
      //   console.log( '[WARNING] File path empty, not renaming' );
      // }
    }

    // options ==> this is the body of the POST request
    var options = {
      form: {
        output_format: 'json',
        output_info: ['warnings', 'errors', 'statistics', 'compiled_code'],
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        warning_level: 'verbose',
        js_externs: js_externs,
        js_code: String(file.contents)    // the Javascript content
      },
      qsStringifyOptions: {arrayFormat: 'repeat'}
    }

    // Sending Javascript to Google closure compiler
    request.post( 'https://closure-compiler.appspot.com/compile', options, function(err, res, body) {
      if( err ) {
        console.log( '[ERROR] There was an error while connecting to Google closure compiler.' );
        process.stdout.write( err );
        return callback( err );
      }
      if( res.statusCode === 200 ) {
        var myJSON = JSON.parse(body);

        if( myJSON.hasOwnProperty('serverErrors') ) {  // Does Google closure compiler returned an error?
          console.log( '[ERROR] Google closure compiler returned an error.' );
          console.log( myJSON.serverErrors );
          return callback(myJSON.serverError);
        } else {
          console.log( myJSON.statistics );
          file.contents = new Buffer(myJSON.compiledCode);
          return callback( null, file );
        }
      }
    });
  };

  return transformStream;
};