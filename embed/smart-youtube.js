var default_h = 315;
var default_w = 600;

var h = window.innerHeight || default_h;
var w = window.innerWidth || default_w;

var player = null;

function onYouTubeIframeAPIReady(){
    console.log('youtube ready!', qs('videoId'), window);

   if (qs('videoId') == null){
       console.log('no videoId provided');
       return false;
   }

   player = new YT.Player('player', {
          height: h,
          width: w,
          videoId: qs('videoId'),
          events: {
            'onStateChange': onPlayerStateChange
          }
    });
}

var alreadyStopped = false;
function onPlayerStateChange(event) {
    console.log('youtube state changed:', event.data);

    if (!alreadyStopped && event.data == -1 && isMobile.any()) {
        // stop the embedded video
        alreadyStopped = true;
        player.stopVideo();

        // try mobile app activator
        if (isMobile.Android()){
            window.location = 'vnd.youtube://www.youtube.com/watch?v=' + qs('videoId');
        }
        else {
            window.location = 'http://www.youtube.com/watch?v=' + qs('videoId') + '&autoplay=1';
        }
    }

    // reset flag state
    if (event.data == YT.PlayerState.CUED){
        alreadyStopped = false;
    }
}

function qs(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};