// --------------------------------------------------
// APP.JS
// --------------------------------------------------

//
// Initialize Foundation
// --------------------------------------------------

// $(document).foundation();  ==> ce bout de code a �t� mit dans <body onload>

//
// Custom JS
// --------------------------------------------------

/* immediately break out of an iframe if coming from the marketing website */
(function(window) {
  if (window.location !== window.top.location) {
    window.top.location = window.location;
  }
})(this);



/*
  Hamburger
*/
(function() {

  "use strict";

  var toggles = document.querySelectorAll(".c-hamburger");

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

})();


/*eslint-env browser*/
/* global ga */

/* Ancienne version de GA  (https://ssl.google-analytics.com/ga.js)
var _gaq=_gaq||[];
_gaq.push(["_setAccount","UA-38973973-2"]);
_gaq.push(["_setVisitorCookieTimeout", 1000*3600*24*365*10]);
_gaq.push(["_gat._forceSSL"]);
_gaq.push(["_setSiteSpeedSampleRate", 10]);
_gaq.push(["_trackPageview"]);*/

//https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#send


window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};
ga.l =+ new Date;

ga( "set", "forceSSL", true );
ga( "create", "UA-38973973-2", "auto", {"siteSpeedSampleRate": 20, "allowAnchor": false, "cookieName": "isINARESOK", "cookieExpires": 1000*3600*24*365*10} );
ga( "send", "pageview" );


  
function loadOK() {
  // Feature detects Navigation Timing API support.
  if (window.performance) {
    // Gets the number of milliseconds since page load (and rounds the result since the value must be an integer).
    var timeSincePageLoad = Math.round( performance.now() );

    // Sends the timing hit to Google Analytics.
    ga( "send", "timing", "Body", "load", timeSincePageLoad );
  }
  
  (function() {
    var timer = 0;
    var count = 0;

    function tCount() {
      count += 500;
      // console.log( count );
      
      if( count === 60000 ) {
        ga( "send", "timing", "Body", "focus", count );
      }
      if( count === 300000 ) {
        ga( "send", "timing", "Body", "focus", count );
      }
    }

    function onBlur() {
      clearInterval( timer );
      // console.log( "onBlur" );
    }

    function onFocus(){
      timer = setInterval( tCount, 500 );
      // console.log( "onFocus" );
    }
    
    
    if ( /*@cc_on!@*/false ) { // check for Internet Explorer
      document.onfocusin  = onFocus;
      document.onfocusout = onBlur;
    } else {
      window.onfocus = onFocus;
      window.onblur  = onBlur;
    }
    
    if( ! timer ) {
      if( document.hasFocus ) {
        if( document.hasFocus() ) {
          onFocus();
        }
      } else {
        onFocus();
      }
    }
  })();

}




