function createComponent2_2(element){
	var inner=$(element).children().first();
	inner.on('touchstart touchmove touchend ',function(e){
		e.stopPropagation();
	});
	
	inner.css({
		'width':$(element).width(),
		'height':$(element).height()-10,
		'position':'absolute',
		'color':'rgba(46, 46, 46, 1)',
		'line-height':'18px',
		'overflow-y':'auto',
		'-webkit-overflow-scrolling':'touch'
	});
	
	var innerText=inner.children().first();
	
	innerText.find('div:nth-child(1)').css({
		'top':'0px',
		'font-size':'15px',
		'font-family':'ltchj, sans-serif',
		'letter-spacing':'1px',
	});
	
	innerText.find('div:nth-child(2)').css({
		'top':'0px',
		'font-size':'13px',
		'font-family':'ltchj, sans-serif',
		'letter-spacing':'-0.5px',
	});
	
	innerText.find('div:nth-child(3)').css({
		'margin-top':'2px',
		'font-size':'12px',
		'font-family':'ltxhj, sans-serif',
		'letter-spacing':'2px',
	});



	if(!$(element).is(':empty')){
		setTextTitle($(element));
	}

}