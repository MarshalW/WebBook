function createComponent3_1(element,imageName){
	
	var imagePath='images/'+imageName;
	var elementObj=$(element)[0];
	var origTop=$(element).css('top');
	
	$(element).css({
		'background':'url('+imagePath+') no-repeat',
		//'-webkit-transform-origin':'50% 0',
		'-webkit-transform-origin':'50% 0',
		//'background-size': '100%'
		'background-size': '' + $(element).width() + ' ' + $(element).height()+ '',
		'background-position':'50% 50%',
	});
	
	if(!$(element).is(':empty')){
		setImageTitle($(element).children().first());
	}
	
	$(element).on('touchstart touchmove touchend',function(e){
		e.preventDefault();
		
		if(elementObj.scale){
			e.stopPropagation();
		}
		
		if (e.type == 'touchstart') {
			elementObj.move=false;
		}
		
		if (e.type == 'touchmove') {
			elementObj.move=true;
		}
		
		if (e.type == 'touchend') {
			
			if(!elementObj.move){
				if(!elementObj.scale){
					var scaleOrigValue=768/($(element).height());
					
					$(element).css({'z-index':'100'});
					$(element).css({
						'-webkit-transition-duration': '.5s',
						'-webkit-transform':'scale('+scaleOrigValue+') translate3d(0,0,0)',
						'top':'0'
						
					});
					$(element).children().first().css({
						'-webkit-transition-duration': '.5s',
						'opacity':'0',
					});
					elementObj.scale=true;
				}else{
					$(element).css({'z-index':'auto'});
					$(element).css({
						'-webkit-transition-duration': '.5s',
						'-webkit-transform':'scale('+1+') translate3d(0,0,0)',
						'top':origTop
					});
					$(element).children().first().css({
						'-webkit-transition-duration': '.5s',
						'opacity':'1',
					});
					elementObj.scale=false;
				}
			
			}
		}
	});
}