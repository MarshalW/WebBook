/**
 * 局部和全部图片的切换，适合本身全屏的图
 * @param element
 * @param imageName
 * @param offsetX
 * @param offsetY
 */
function createPartImageContainer(element,imageName,offsetX,offsetY){
	//设置偏移量默认值
	offsetX=offsetX||0,offsetY=offsetY||0;
	//创建嵌套元素，用于装载图片，暂时没有其他用处
	var innerElement=$('<div></div>').appendTo(element).css({
		'position':'absolute',
		'height':element.height(),
		'width':element.width(),
	});
	
	//创建图片对象
	var image=new Image();
	var height=768;
	var elementHeight=innerElement.height();
	
	image.src='images/'+imageName;
	innerElement.append(image);
	$(image).css('position','absolute');
	
	//图片加载成功后处理
	$(image).on('load',function(){
		//设置图片初始偏移量
		$(image).css({
			'top':-offsetX+'px',
			'left':-offsetY+'px',
		});
		
		image.moveX=0,image.moveY=0;
		image.lastX=0,image.lastY=0;
		
		element.on('touchstart touchmove touchend',function(e){
			e.preventDefault();
			
			if (e.type == 'touchstart') {
//				console.log('touch start.');
				image.moved=false;
				image.touchId=e.originalEvent.targetTouches[0].identifier;
				return;
			}
			if (e.type == 'touchmove') {
//				console.log('touch move.');
				image.moved=true;
				
				//打开状态不能翻页
				if(image.triggered){
					e.stopPropagation();
					return;
				}
				
				//执行多点移动等交互
				if(e.originalEvent.targetTouches.length>=2){
					e.stopPropagation();//禁止翻页
					
					var touch1=e.originalEvent.targetTouches[0];
					var touch2=e.originalEvent.targetTouches[1];
					
					//取得2点的中点坐标
					var originX=Math.min(touch1.pageX,touch2.pageX)+Math.abs(touch1.pageX-touch2.pageX);
					var originY=Math.min(touch1.pageY,touch2.pageY)+Math.abs(touch1.pageY-touch2.pageY);
					
//					var originX=touch1.pageX,originY=touch2.pageX;
					
					console.log('origin:'+originX+','+originY);
					
					if(image.lastX!=0){
						image.moveX+=originX-image.lastX;
						image.moveY+=originY-image.lastY;
					}
					
//					console.log('>>>>>moveX:'+image.moveX+',moveY:'+image.moveY);
					
					$(element).css({
						'-webkit-transform':'scale('+image.scale+') '+
						'rotate('+image.rotation+'deg)'
						+'translate3d(' + image.moveX + 'px,' + image.moveY
								+ 'px,0)',
						'-webkit-transform-origin':'left '+originX+'px top '+originY+'px',
//						'-webkit-transform-origin':'left top',
					});
					
					image.lastX=originX,image.lastY=originY;
				}
				
				return;
			}
			if (e.type == 'touchend') {
				if(image.touchId!=e.originalEvent.changedTouches[0].identifier){
					return;
				}
				
				if(!image.moved){
					if(!image.triggered){
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
					image.triggered=!image.triggered;
				}
			}
		});
		
		element.on('gesturestart gesturechange gestureend',function(e){
			if(e.type=='gesturestart'){
				element.toggleClass('boxShadow');
//				console.log('gesture start.');
			}
			if(e.type=='gesturechange'){
//				console.log('gesture change.');
				image.scale=e.originalEvent.scale;
				image.rotation=e.originalEvent.rotation;
			}
			if(e.type=='gestureend'){
				element.toggleClass('boxShadow');
				
				if(image.scale>1.2){//放大
					element.css({
						'-webkit-transition-duration' : '0.5s',
						'-webkit-transform':'rotate(0)',
						'height':height+'px',
					});
					$(image).css({
						'-webkit-transition-duration' : '0.5s',
						'top':0+'px',
						'left':0+'px',
					});
					image.triggered=true;
				}else{//还原
					element.css({
						'-webkit-transition-duration' : '0.5s',
						'-webkit-transform':'rotate(0)',
						'height':elementHeight+'px',
					});
					$(image).css({
						'-webkit-transition-duration' : '0.5s',
						'top':-offsetX+'px',
						'left':-offsetY+'px',
					});
				}
				
			}
		});
	});
}