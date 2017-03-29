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
        'height':  '500px',
        'width':   '100%',
        'videoId': '6rdTSv8V1P4',
        'playerVars': {
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
        'events': {
          'onReady': onPlayerReady
        }
      } );
    };

    // Store the function in a global property referenced by a string:
    window['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;

    var accueil = document.querySelector("#accueil");
    accueil.style.backgroundColor = "rgba(92, 48, 151, 0.8)";
    // console.log( "ICI 9" );
  })();
} else {
}