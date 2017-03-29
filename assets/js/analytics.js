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

