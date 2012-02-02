/**
 * 局部和全部图片的切换，适合本身全屏的图
 * @param element
 * @param imageName
 * @param offsetX
 * @param offsetY
 * TODO: 做了部分重构，封装了元素的放大和缩小，但是有一些状态值还很零散，看起来很混乱，等有时间做进一步重构。
 */
function createPartImageContainer(element,imageName,offsetX,offsetY){
	//设置偏移量默认值
	offsetX=offsetX||0,offsetY=offsetY||0;
	var elementLeft=element.position().left,elementTop=element.position().top;

	
	//创建图片对象
	var image=new Image();
	var width=1024;
	var height=768;
	var elementHeight=element.height();
	
	image.src='images/'+imageName;
	element.append(image);
	$(image).css('position','absolute');
	
	//图片加载成功后处理
	$(image).on('load',function(){
		//设置图片初始偏移量
		$(image).css({
			'-webkit-transform':'translate3d('+(-offsetX)+'px,'+(-offsetY)+'px,0)',
		});
		
		image.moveX=0,image.moveY=0;
		image.lastX=0,image.lastY=0;
		
		element[0].doScale=function(isScale){
			element[0].scale=element[0].scale||false;
			
			if(typeof(isScale)=='undefined'){
				element[0].scale=!element[0].scale;
			}else{
				element[0].scale=isScale;
			}
			
			if(element[0].scale){
				console.log('scale');
				element.css({
					'-webkit-transition-duration' : '0.5s',
					'height':height+'px',
					'-webkit-transform':'rotate(0) translate3d('+(-elementLeft)+'px,'+(-elementTop)+'px,0)',
				});
			}else{
				element.css({
					'-webkit-transition-duration' : '0.5s',
					'height':elementHeight+'px',
					'-webkit-transform':'rotate(0) translate3d(0,0,0)',
				});
			}
			image.doScale(element[0].scale);
		};
		
		image.doScale=function(isScale){
			//处理偏移量，主要是针对大于屏幕的图，只看其中一部分，这样要保持偏移量为左上定点的取景框
			var originX=0,originY=0;
			
			if(image.width>width+offsetX){
				originX=offsetX;
			}
			
			if(image.height>height+offsetY){
				originX=offsetY;
			}
			
			if(isScale){
				$(image).css({
					'-webkit-transition-duration' : '0.5s',
					'-webkit-transform':'translate3d(-'+originX+'px,-'+originY+'px,0)',
				});
			}else{
				$(image).css({
					'-webkit-transition-duration' : '0.5s',
					'-webkit-transform':'translate3d('+(-offsetX)+'px,'+(-offsetY)+'px,0)',
				});
			}
		};
		
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
				if(image.triggered || image.doAction){
					e.stopPropagation();
					
					if(image.triggered){
						return;
					}
				}
				
				//执行多点移动等交互
				if(e.originalEvent.targetTouches.length>=2){
					e.stopPropagation();//禁止翻页
					
					var touch1=e.originalEvent.targetTouches[0];
					var touch2=e.originalEvent.targetTouches[1];
					
					//取得2点的中点坐标
					var originX=Math.min(touch1.pageX,touch2.pageX)+Math.abs(touch1.pageX-touch2.pageX);
					var originY=Math.min(touch1.pageY,touch2.pageY)+Math.abs(touch1.pageY-touch2.pageY);
					
					if(image.lastX!=0){
						image.moveX+=originX-image.lastX;
						image.moveY+=originY-image.lastY;
					}
					
//					console.log('>>>>>moveX:'+image.moveX+',moveY:'+image.moveY);
					
					$(element).css({
						'-webkit-transform':'scale('+image.scale+') '+
						'rotate('+image.rotation+'deg)'
						+'translate3d(' + image.moveX/image.scale + 'px,' + image.moveY/image.scale
								+ 'px,0)',
						'-webkit-transition-duration' : '0s',
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
					element[0].doScale();
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
				image.doAction=true;
			}
			if(e.type=='gestureend'){
				image.doAction=false;
				element.toggleClass('boxShadow');
				
				if(image.scale>1.2){//放大
					element[0].doScale(true);
					image.triggered=true;
				}else{//还原
					element[0].doScale(false);
					image.triggered=false;
				}
				
				
			}
		});
	});
}