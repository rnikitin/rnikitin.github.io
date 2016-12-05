$(function(){
  if (isMobile()){ 
    // if mobile, we will redirect all clicks on enbeded video to play in external window or app
    console.log('Mobile device is detected');

    $('.video').click(function(e){
        
        e.preventDefault();
        
        console.log('video post clicked');

        return false;
    });

    $('iframe').click(function(){
       console.log('iframe:', $(this).attr('src')); 
    });

    $('.ytp-thumbnail-overlay-image').click(function(e){
        console.log('overlay clicked');

        e.preventDefault();
        return false;
    });
  }
});


function isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    
    return false;
}
// ytp-thumbnail-overlay-image
