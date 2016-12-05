var default_height = 390;
var default_width = 640;

var qs = null;
var player = null;

function onYouTubeIframeAPIReady(){
    qs = getQueryString();

    console.log('youtube ready!', qs, window);

   if (qs['videoId'] == null){
       console.log('no videoId provided');
       return false;
   }

   player = new YT.Player('player', {
          height: qs['height'] || default_height,
          width: qs['width'] || default_width,
          videoId: qs['videoId'],
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
            window.location = 'vnd.youtube://www.youtube.com/watch?v=' + qs['videoId'];
        }
        else {
            window.location = 'http://www.youtube.com/watch?v=' + qs['videoId'] + '&autoplay=1';
        }
    }

    // reset flag state
    if (event.data == YT.PlayerState.CUED){
        alreadyStopped = false;
    }
}

function getQueryString(){
    var qd = {};
    location.search.substr(1).split("&").forEach(function(item) {(item.split("=")[0] in qd) ? qd[item.split("=")[0]].push(item.split("=")[1]) : qd[item.split("=")[0]] = [item.split("=")[1]]})
    return qd;
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