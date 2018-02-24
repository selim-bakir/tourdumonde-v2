// adds mobile class, and mobile os to html tag
jQuery(document).ready(function($){
    var deviceAgent = navigator.userAgent.toLowerCase();
    
    if (deviceAgent.match(/(ipad)/)) {
      $('html').addClass('ipad');
    }
    
    if (deviceAgent.match(/android/)) {
      $('html').addClass('android');
      $('html').addClass('mobile');
    }
    
    if (deviceAgent.match(/blackberry/)) {
      $('html').addClass('blackberry');
      $('html').addClass('mobile');
    }
    
    if (deviceAgent.match(/(symbianos|^sonyericsson|^nokia|^samsung|^lg)/)) {
      $('html').addClass('mobile');
    }
    
  });

(function () {
    var overlay = document.getElementById('overlay'),
        htmlTag = document.querySelector('html'),
        slideshow = document.getElementById('slideshow'),
        // overlayClose = overlay.querySelector('button'),
        header = document.getElementById('header'),
        switchBtnn = header.querySelector('button.slider-switch'),
        earthBtn = document.getElementById('trigger-overlay');
    toggleBtnn = function () {
            if (slideshow.isFullscreen) {
                classie.add(switchBtnn, 'view-maxi');
            } else {
                classie.remove(switchBtnn, 'view-maxi');
            }
        },
        toggleCtrls = function () {
            if (!slideshow.isContent) {
                classie.add(header, 'hide');
                classie.add(switchBtnn, 'hide');
                classie.add(earthBtn, 'hide');
            }
        },
        toggleCompleteCtrls = function () {
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
        toggleSlideshow = function () {
            slideshow.toggle();
            console.log('toggleSlideshow');
            toggleBtnn();
        },
        closeOverlay = function () {
            classie.add(overlay, 'hide');
        };

    // toggle between fullscreen and small slideshow
    switchBtnn.addEventListener('click', toggleSlideshow);
    // close overlay
    // overlayClose.addEventListener('click', closeOverlay);


}());

// $('.switch-max .slide.current').click(function () {
//     $('.slide.current .content-switch').click();
// });



/********************* 
 *** FLICKR API ***
//  *********************/

function getPhotoFlickr(id, country) {

    if ($("#" + country + "").is(':empty')) {
        $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.photosets.getPhotos',
                api_key: 'a95ff5e1ffae68765c52261e18500a33',
                photoset_id: id,
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        }).done(function (data) {
            console.log(data);
            var gallery = $("#" + country + ""),
                url;
            // console.log('Galerie : '+gallery);
            $.each(data.photoset.photo, function (index, photo) {
                url = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;
                gallery
                    .append('<li><a rel="group" class="fancybox" data-caption="' + photo.title + '" data-fancybox="images-' + data.photoset.id + '" href="' + url + '_b.jpg' + '" target="_blank"><img src="' + url + '_m.jpg' + '"></a></li>');
            });
        });
    } else {
        return;
    }
};

//au click sur la flêche "voir plus - API CALL"
$('.showPhotos').click(function () {
    var id = $(this).attr('data-album'),
        country = $(this).attr('data-country');
    getPhotoFlickr(id, country);
})

$(document).ready(function () {
    $('.slide.coming-soon .content-switch').hide();
    if ($(window).width() > 960) {
        $('.slider-switch').click();
    }
    setTimeout(function(){
        $('.slide[data-content="content-5"]').click()
    }, 2000);
    
});