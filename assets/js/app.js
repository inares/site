// --------------------------------------------------
// APP.JS
// --------------------------------------------------

/*eslint-env browser*/
/* global ga */

"use strict";


/* immediately break out of an iframe if coming from the marketing website */
(function(window) {
  if (window.location !== window.top.location) {
    window.top.location = window.location;
  }
})(this);




function loadOK() {
  (function() {
    /**** Navigation Timing ****/
    if (window.performance) {
      // Gets the number of milliseconds since page load (and rounds the result since the value must be an integer).
      var timeSincePageLoad = Math.round( performance.now() );

      // Sends the timing hit to Google Analytics.
      ga( "send", "timing", "Body", "load", timeSincePageLoad );
    }


    /**** Analytics events ****/
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

    window.onfocus = onFocus;
    window.onblur  = onBlur;

    if( ! timer ) {
      if( document.hasFocus ) {
        if( document.hasFocus() ) {
          onFocus();
        }
      } else {
        onFocus();
      }
    }


    /**** Matrix effect ****/
    var matrix_activated = true;
    if( matrix_activated ) {
      var eQuote = document.querySelector("#neat");

      var regex = /\ /;
      // save the original paragraph as array of words
      // regex = /[,.?!;:]/; /* Uncomment for sentences */
      var aQuote = eQuote.innerHTML.split(regex);

      // wrap each word with a span
      eQuote.innerHTML = "";
      /*aQuote.forEach( function(word) {
        eQuote.innerHTML += "<span>" + aQuote[word] + "</span>";
      } );*/
      for(var word in aQuote){
        eQuote.innerHTML += "<span>" + aQuote[word] + "</span>";
      }

      // ...and save them for later
      var eWords = document.querySelectorAll("span");

      function fHighlightRandomWord (e) {
        var iRandom = Math.floor(Math.random() * e.length);
        e[iRandom].classList.add("highlight");
      }

      function fClearAllHighlights (e) {
        var nlHighlights = e.querySelectorAll(".highlight");
        // convert the nodeList into an array
        var aHighlights = Array.prototype.slice.call(nlHighlights);
        // remove .highlight from the spans which have it
        Array.prototype.map.call(aHighlights, function(){
          arguments[0].classList.remove("highlight");
        });
      }

      /*var repeat =*/ setInterval(function() {
        if( Math.random() > 0.85 ) fClearAllHighlights( eQuote );
        if( getComputedStyle(eQuote).getPropertyValue('display') != "none" ) fHighlightRandomWord( eWords );
      }, 275);
    }



    /**** Hamburger (menu icon) ****/
    var toggles = document.querySelectorAll(".c-hamburger");

    function toggleHandler( toggle ) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      });
    }

    for (var i=toggles.length-1 ; i>=0 ; i--) {
      var toggle = toggles[i];
      toggleHandler( toggle );
    };

  })();

}

window['loadOK'] = loadOK;




