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


    /*if ( //@cc_on!@//false ) { // check for Internet Explorer
      document.onfocusin  = onFocus;
      document.onfocusout = onBlur;
    } else*/ {
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
        eQuote.innerHTML += "<span>" + word + "</span>";
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





/*eslint-env browser*/
/* global ga, window.ga */

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


/*eslint-env browser*/
/* global YT */
/* global onYouTubeIframeAPIReady */

/* https://developers.google.com/youtube/iframe_api_reference */

var youtube_activated = true;

if( youtube_activated ) {
  (function() {
    var eQuote = document.querySelector("#neat");
    if( getComputedStyle(eQuote).getPropertyValue('display') == "none" )
      return;

    /* loads the IFrame Player API code asynchronously */
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // console.log( "ICI 3" );

    /* The API will call this function when the video player is ready.*/
    function onPlayerReady( event ) {
      // console.log( "ICI onPlayerReady 1" );
      var player = event.target;
      player.mute();
      player.setVolume(0);
      player.playVideo();
    }

    // console.log( "ICI 5" );

    /* This function creates an <iframe> (and YouTube player) after the API code downloads. */
    var player;
    function onYouTubeIframeAPIReady() {
      // console.log( "ICI onYouTubeIframeAPIReady 1" );
      player = new YT.Player( 'player', {
        height:  '500px',
        width:   '100%',
        videoId: '6rdTSv8V1P4',
        playerVars: {
          /*  https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters */
          'autoplay': 1,
          'cc_load_policy': 0,
          'controls': 0,
          'disablekb': 1,
          'enablejsapi': 1,
          'fs': 0,
          'hl': 'fr',
          'iv_load_policy': 3,        /* Les annotations vidéo ne s'affichent pas */
          'loop': 1,
          'modestbranding': 1,        /* Ne pas afficher le logo YouTube */
          'origin': 'inares-site-home-inares.c9users.io',   /* Domaine d'origine lorsque enablejsapi est à 1 */
          'playlist': '6rdTSv8V1P4',  /* Pour que loop fonctionne */
          'rel': 0,                   /* Ne pas afficher des vidéos similaires à la fin de la lecture d'une vidéo */
          'showinfo': 0,              /* Le lecteur n'affiche aucune information, comme le titre de la vidéo et l'utilisateur l'ayant mise en ligne, avant le lancement de la lecture */
          'start': 3
        },
        events: {
          'onReady': onPlayerReady
        }
      } );
    };

    // Store the function in a global property referenced by a string:
    // window['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;

    var accueil = document.querySelector("#accueil");
    accueil.style.backgroundColor = "rgba(92, 48, 151, 0.8)";
    // console.log( "ICI 9" );
  })();
} else {
}