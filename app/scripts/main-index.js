(function() {

				var overlay = document.getElementById( 'overlay' ),
					overlayClose = overlay.querySelector( 'button' ),
					header = document.getElementById( 'header' )
					switchBtnn = header.querySelector( 'button.slider-switch' ),
					toggleBtnn = function() {
						if( slideshow.isFullscreen ) {
							classie.add( switchBtnn, 'view-maxi' );
						}
						else {
							classie.remove( switchBtnn, 'view-maxi' );
						}
					},
					toggleCtrls = function() {
						if( !slideshow.isContent ) {
							classie.add( header, 'hide' );
							classie.add( switchBtnn, 'hide' );
						}
					},
					toggleCompleteCtrls = function() {
						if( !slideshow.isContent ) {
							classie.remove( header, 'hide' );
							classie.remove( switchBtnn, 'hide' );
						}
					},
					slideshow = new DragSlideshow( document.getElementById( 'slideshow' ), {
						// toggle between fullscreen and minimized slideshow
						onToggle : toggleBtnn,
						// toggle the main image and the content view
						onToggleContent : toggleCtrls,
						// toggle the main image and the content view (triggered after the animation ends)
						onToggleContentComplete : toggleCompleteCtrls
					}),
					toggleSlideshow = function() {
						slideshow.toggle();
						toggleBtnn();
					},
					closeOverlay = function() {
						classie.add( overlay, 'hide' );
					};

				// toggle between fullscreen and small slideshow
				switchBtnn.addEventListener( 'click', toggleSlideshow );
				// close overlay
				overlayClose.addEventListener( 'click', closeOverlay );
			}());


/********************* 
 *** INSTAGRAM API ***
 *********************/

			var token = '5848647513.1677ed0.fe48758d8b7e489392819649b4a4d234', // learn how to obtain it below
			    userid = 5848647513, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
			    num_photos = 99999; // how much photos do you want to get

			$.ajax({
				url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
				dataType: 'jsonp',
				type: 'GET',
				data: {access_token: token, count: num_photos},

				success: function(data){
					console.log(data.data);
					for(x in data.data){

						var image = data.data[x].images.standard_resolution.url,
						imageLarge = image.replace(/s[0-9]+x[0-9]+\/(sh[0-9]+.[0-9]+\/)*/,"");

						if(data.data[x].tags[0] == 'pikipackersinde'){	
						$('#inde').append('<li><a rel="group" class="fancybox" data-fancybox="images-'+data.data[x].tags[0]+'" href="'+imageLarge+'" target="_blank"><img src="'+data.data[x].images.low_resolution.url+'"></a></li>');
					}
						if(data.data[x].tags[0] == 'pikipackersbirmanie'){	
						$('#birmanie').append('<li><a rel="group" class="fancybox" data-fancybox="images-'+data.data[x].tags[0]+'" href="'+imageLarge+'" target="_blank"><img src="'+data.data[x].images.low_resolution.url+'"></a></li>');
						}
					}
				},
				error: function(data){
					console.log(data);
				}
			});