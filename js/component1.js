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
		
		element.on('touchstart touchmove touchend',function(e){
			e.preventDefault();
			
			if (e.type == 'touchstart') {
				console.log('touch start.');
				
				//只有当第一次touchstart的时候设置标值位
				if(e.originalEvent.targetTouches.length==1){
					image.moved=false;
				}
			}
			if (e.type == 'touchmove') {
				onsole.log('touch move.');
				
				//如果状态是放大，或者多点移动
				if(image.triggered || e.originalEvent.targetTouches.length>1){
					e.stopPropagation();
					
					if(e.originalEvent.targetTouches.length>1){
						var touch=e.originalEvent.targetTouches[0];
						var changeTouch=e.originalEvent.targetTouches[1];
						
						if(touch.identifier!=changeTouch.identifier){
							console.log('gesture id:'+touch.identifier+',change id:'+changeTouch.identifier);
						}
					}
					return;
				}
				
				image.moved=true;
			}
			if (e.type == 'touchend') {
				console.log('touch end.');
				
				if(image.triggered){
					e.stopPropagation();
				}
				
				//如果已经向下传递过移动，则返回
				if(image.moved){
					return;
				}
				
				//多点的end不做处理
				if(e.originalEvent.targetTouches.length>0){
					return;
				}
				
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
				
				if(e.originalEvent.targetTouches.length==0){
					image.triggered=!image.triggered;
				}
			}
		});
		
		element.on('gesturestart gesturechange gestureend',function(e){
			if(e.type=='gesturestart'){
				element.toggleClass('boxShadow');
				console.log('gesture start.');
			}
			if(e.type=='gesturechange'){
				console.log('gesture change.');
			}
			if(e.type=='gestureend'){
				element.toggleClass('boxShadow');
			}
		});
	});
}