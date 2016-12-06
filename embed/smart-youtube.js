var h = window.innerHeight - 10;
var w = window.innerWidth - 10;

var player = null;
var txtconsole = null;

function onYouTubeIframeAPIReady(){
    txtconsole = document.getElementById('txtconsole');

    log('onYouTubeIframeAPIReady:', navigator.userAgent);
    log('IsMobile:', isMobile.any(), 'Android:', isMobile.Android(), 'iOS:', isMobile.iOS());

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
        
        setTimeout(function(){
            player.stopVideo();
        });

        // try mobile app activator
        if (isMobile.Android()){
            window.location = 'vnd.youtube://www.youtube.com/v/' + qs('videoId');
        }
        else {
            window.location = 'https://www.youtube.com/v/' + qs('videoId');
        }
    }

    // reset flag state
    if (event.data == YT.PlayerState.CUED){
        alreadyStopped = false;
    }
}

function log(){
    var args = Array.prototype.slice.call(arguments);

    // output to dev console
    Function.apply.call(console.log, console, args);

    // output to textarea console
    var newline = '\n' + args.join(' ');
    txtconsole.value += newline;
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