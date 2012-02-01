function setImageTitle(element){
	var height=20;
	element.css({
		'background':'rgba(0,0,0,.8)',
		'height':height,
		'width':element.parent().width(),
		'top':element.parent().height()-height,
		'position':'absolute',
		'color':'white',
		'font-size':'8px',
		'font-family':'ltxhj, sans-serif',
		'line-height':'20px',
		'text-indent':'5px',
		'letter-spacing':'1px',
		'background-image':'url(images/multibleimage.png)',
		'background-position':'100% 0%',
		'background-repeat':'no-repeat'
		
	});
	
	
}

function setTextTitle(element){
	var height=10;
	var inner=$(element).children().first();
	var innerText=inner.children().first();
	if(inner.css('height')<innerText.css('height')){
		$('<div>划动显示更多内容</div>').appendTo($(element)).css({
			'background':'rgba(0,0,0,.8)',
			'height':height,
			'width':$(element).css('width'),
			'top':'0px',
			'left':'0px',
			'background-image':'url(images/down.png) ',
			'background-position':'100% 0%',
			'background-repeat':'no-repeat',
			'position':'absolute',
			'color':'white',
			'font-size':'8px',
			'font-family':'ltxhj, sans-serif',
			'text-indent':'5px',
			'letter-spacing':'2px',
			'line-height':'10px'
		});
		
		inner.css({
			'height':element.height()-10,
			'top':'10px'
		});
	}

	
}

function createBookMark(){
	$('<img class= "blackbookmark" src="images/blackbookmark.png"/>').appendTo($('.pageContent'));
	$('<img class= "whitebookmark" src="images/littlebookmark.png"/>').appendTo($('.pageContent'));

}