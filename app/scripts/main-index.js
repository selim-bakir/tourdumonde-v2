(function() {
    var overlay = document.getElementById('overlay'),
        htmlTag = document.querySelector('html'),
        slideshow = document.getElementById('slideshow'),
        overlayClose = overlay.querySelector('button'),
        header = document.getElementById('header'),
        switchBtnn = header.querySelector('button.slider-switch'),
        earthBtn = document.getElementById('trigger-overlay');
    toggleBtnn = function() {
            if (slideshow.isFullscreen) {
                classie.add(switchBtnn, 'view-maxi');
            } else {
                classie.remove(switchBtnn, 'view-maxi');
            }
        },
        toggleCtrls = function() {
            if (!slideshow.isContent) {
                classie.add(header, 'hide');
                classie.add(switchBtnn, 'hide');
                classie.add(earthBtn, 'hide');
            }
        },
        toggleCompleteCtrls = function() {
            if (!slideshow.isContent) {
                classie.remove(header, 'hide');
                classie.remove(switchBtnn, 'hide');
                classie.remove(earthBtn, 'hide');
            }
        },
        slideshow = new DragSlideshow(document.getElementById('slideshow'), {
            // toggle between fullscreen and minimized slideshow
            onToggle: toggleBtnn,
            // toggle the main image and the content view
            onToggleContent: toggleCtrls,
            // toggle the main image and the content view (triggered after the animation ends)
            onToggleContentComplete: toggleCompleteCtrls
        }),
        toggleSlideshow = function() {
            slideshow.toggle();
            console.log('toggleSlideshow');
            toggleBtnn();
        },
        closeOverlay = function() {
            classie.add(overlay, 'hide');
            if ($(window).width() > 960) {
                $('.slider-switch').click();
            }
        };

    // toggle between fullscreen and small slideshow
    switchBtnn.addEventListener('click', toggleSlideshow);
    // close overlay
    overlayClose.addEventListener('click', closeOverlay);


}());

$('.switch-max .slide.current').click(function() {
    console.log('ici');
    $('.slide.current .content-switch').click();



    function getComments() {
        debugger;
        var media_id = $(this).attr('data-id');
        $.ajax({
            url: 'https://api.instagram.com/v1/media/' + media_id + '/comments?access_token=' + token + '',
            dataType: 'jsonp',
            type: 'GET',

            success: function(data) {
                console.log('GetComments : ' + data.data);
            },
            error: function(data) {
                console.log(data);
            }
        });
    }


});



/********************* 
 *** INSTAGRAM API ***
 *********************/

var token = '1352546675.1677ed0.1f0a0dcb1ef84a7b8e9ea9c46882a524', // learn how to obtain it below
    userid = 1352546675, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 99999; // how much photos do you want to get

$.ajax({
    url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },

    success: function(data) {
        console.log(data.data);
        for (x in data.data) {
            if(data.data[x].type != 'video'){
                var image = data.data[x].images.standard_resolution.url,
                    imageLarge = image.replace(/s[0-9]+x[0-9]+\/(sh[0-9]+.[0-9]+\/)*/, "");
                $('#' + data.data[x].tags[0]).append('<li><a rel="group" class="fancybox" data-caption="' + data.data[x].caption.text + '" data-id="' + data.data[x].id + '" data-fancybox="images-' + data.data[x].tags[0] + '" href="' + imageLarge + '" target="_blank"><img src="' + data.data[x].images.low_resolution.url + '"></a></li>');
            }
            // else{
            //     var url_video = data.data[x].link,
            //         fancyUrl = url_video.substr(27);
            //         console.log('fancyUrl : ' +fancyUrl);

            //     $('#' + data.data[x].tags[0]).append('<li><a rel="group" class="fancybox" data-type="video" data-caption="' + data.data[x].caption.text + '" data-id="' + data.data[x].id + '" data-fancybox="' + data.data[x].link + '" href="http://instagr.am/p' + fancyUrl + '" target="_blank"><img src="' + data.data[x].images.low_resolution.url + '"></a></li>');
            // }
        }
    },
    error: function(data) {
        console.log(data);
    }
});


$(document).ready(function() {
    $('.slide.coming-soon .content-switch').hide();
});