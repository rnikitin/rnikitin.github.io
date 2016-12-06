var h = window.innerHeight - 10;
var w = window.innerWidth - 10;

var player = null;

function onYouTubeIframeAPIReady(){

    console.log('onYouTubeIframeAPIReady:', navigator.userAgent);
    console.log('IsMobile:', isMobile.any(), 'Android:', isMobile.Android(), 'iOS:', isMobile.iOS());

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
    if (!alreadyStopped && event.data == -1 && isMobile.any()) {
        // stop the embedded video
        alreadyStopped = true;
        player.stopVideo();

        // try redirect to app
        if (isMobile.Android()){
            window.top.location.href = 'vnd.youtube://www.youtube.com/v/' + qs('videoId');
        }
        else {
            window.top.location.href = 'http://www.youtube.com/watch?v=' + qs('videoId');
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