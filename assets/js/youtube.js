/*eslint-env browser*/
/* global YT */
/* global onYouTubeIframeAPIReady */
/* global youtube_activated */

/* https://developers.google.com/youtube/iframe_api_reference */

// youtube_activated is set in head.html, with a liquid tag : var youtube_activated = {{site.is_production}};

if( youtube_activated ) {
  (function() {
    var eQuote = document.querySelector("#neat");
    if( getComputedStyle(eQuote).getPropertyValue('display') === "none" )
      return;

    /* Loads the IFrame Player API code asynchronously */
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* This function creates an <iframe> (and YouTube player) after the API code downloads. */
    function onYouTubeIframeAPIReady() {
      new YT.Player( 'player', {
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
           /* The API will call this function when the video player is ready.*/
          'onReady': function( event ) {
            var player = event.target;
            player.mute();
            player.setVolume(0);
            player.playVideo();
          }
        }
      } );
    };

    // Store the function in a global property referenced by a string:
    window['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;

    document.querySelector("#accueil").style.backgroundColor = "rgba(92, 48, 151, 0.8)";
  })();
} else {
}