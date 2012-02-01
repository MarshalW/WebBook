/**
 * 局部和全部图片的切换，适合本身全屏的图
 * @param element
 * @param imageName
 * @param offsetX
 * @param offsetY
 */
function createPartImageContainer(element,imageName,offsetX,offsetY){
	offsetX=offsetX||0,offsetY=offsetY||0;
	var innerElement=$('<div></div>').appendTo(element).css({
		'position':'absolute',
		'height':element.height(),
		'width':element.width(),
	});
	
	var image=new Image();
	var height=768;
	var elementHeight=innerElement.height();
	
	image.src='images/'+imageName;
	innerElement.append(image);
	$(image).css('position','absolute');
	
	$(image).on('load',function(){
		var triggered=false;
		
		$(image).css({
			'top':-offsetX+'px',
			'left':-offsetY+'px',
		});
		
		element.on('touchstart touchmove touchend',function(e){
			e.preventDefault();
			
			if (e.type == 'touchstart') {
				image.moved=false;
			}
			if (e.type == 'touchmove') {
				image.moved=true;
				if(triggered || e.originalEvent.targetTouches.length>1){
					e.stopPropagation();
					
					var touch=e.originalEvent.targetTouches[0];
					var changeTouch=e.originalEvent.changedTouches[0];
					
//					console.log('gesture id:'+touch.identifier+',change id:'+changeTouch.identifier);
					
					if(touch.identifier!=changeTouch.identifier){
						console.log('>>>>>>gesture id:'+touch.identifier);
					}
					
					return;
				}
			}
			if (e.type == 'touchend') {
				console.log('touch end.');
				if(image.moved){
					return;
				}
				if(!triggered){
					element.css({
						'-webkit-transition-duration' : '0.5s',
						'height':height+'px',
					});
					$(image).css({
						'-webkit-transition-duration' : '0.5s',
						'top':0+'px',
						'left':0+'px',
					});
				}else{
					element.css({
						'-webkit-transition-duration' : '0.5s',
						'height':elementHeight+'px',
					});
					$(image).css({
						'-webkit-transition-duration' : '0.5s',
						'top':-offsetX+'px',
						'left':-offsetY+'px',
					});
				}
				triggered=!triggered;
			}
		});
		
		element.on('gesturestart gesturechange gestureend',function(e){
			if(e.type=='gesturestart'){
				element.toggleClass('boxShadow');
				console.log('gesture start.');
			}
			if(e.type=='gesturechange'){
//				var touch=e.originalEvent.targetTouches[0];
//				var changeTouch=e.originalEvent.changedTouches[0];
				
//				if(touch.identifier==changeTouch.identifier){
//					console.log('gesture change: moved');
//				}
				
				
			}
			if(e.type=='gestureend'){
				element.toggleClass('boxShadow');
			}
		});
	});
}