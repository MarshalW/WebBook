function createComponent2_3(element,imageName){
	var video=$(element).children().first();
	var videoPoster=$(element).find(':nth-child(2)').children().first();
	var imagePath='images/'+imageName;
	
	
	video.css({
		'display':'none'
	});
	
	$(element).find(':nth-child(2)').css({
		'width':'321px',
		'height':'176px',
		'left':'0px',
		'top':'0px',
		'position':'absolute',
		'background-image':'url('+imagePath+') ',
		'background-repeat':'no-repeat'
		
	});
	videoPoster.css({
		'position':'absolute',
		'top':'60px',
		'left':'133px'
	});
	
	//视频
	videoPoster.on('touchstart touchmove touchend', function(e){
		
	var movie = video[0];
	
		if (e.type == 'touchstart') {
			movie.moved = false;
			
		}

		if (e.type == 'touchmove') {
			movie.moved = true;
			
		}
		if (e.type == 'touchend' && !movie.moved) {
			
			$(element).find(':nth-child(2)').css('opacity','0');
			video.css('display','inline');
			video.get(0).play();
		}
		
	});
	
//	$('#content').on('webkitTransitionEnd', function(e) {
//		//console.log('release video.');
//		console.log(pages.currentIndex);
//		
//		video.get(0).pause();
//	});
	
}