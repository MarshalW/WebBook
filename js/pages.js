var Page = function(pageIndex) {
	var that = $('<div class="page"></div>');
	that.load('data/page' + (pageIndex+1) + '.html');
	return that;
};

var Pages = function(size, index) {
	var pageScroll = $('<div class="pageScroll"></div>');

	var pages = $('<div class="pages"></div>');
	pages.size = size;
	pages.currentIndex = index;
	pages.width = 1024;
	pages.css('width', pages.width * pages.size + 'px');

	pages.appendTo(pageScroll);

	$('#content').empty();
	$(pageScroll).appendTo($('#content'));

	$(pageScroll).on(
			'touchstart touchmove touchend',
			function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				if(e.originalEvent.targetTouches.length>1){
					return;
				}
				
				if (e.type == 'touchstart') {
					pages.moveX = 0;
					pages.velocity = 0;
					pages.lastX = e.originalEvent.targetTouches[0].pageX;
					pages.touchId=e.originalEvent.targetTouches[0].identifier;
					
//					console.log('page touch start');
				}
				
				if (e.type == 'touchmove') {
					
					if(pages.touchId!=e.originalEvent.targetTouches[0].identifier){
						return;
					}
					
//					console.log('page touch move.');
					pages.velocity = e.originalEvent.targetTouches[0].pageX
							- pages.lastX;
					pages.moveX += e.originalEvent.targetTouches[0].pageX
							- pages.lastX;
					$(pages).css(
							'-webkit-transform',
							'translate3d('
									+ (pages.moveX + pages.width
											* (-pages.currentIndex)) + 'px,0,0)');

					pages.lastX = e.originalEvent.targetTouches[0].pageX;
				}

				var moveX = 0;

				if (e.type == 'touchend') {
					if(pages.touchId!=e.originalEvent.changedTouches[0].identifier){
						return;
					}
					if (Math.abs(pages.moveX) > 1024 / 3 || Math.abs(pages.velocity)>2) {
//						console.log('pages touch end index:' + pages.currentIndex);
						if (pages.moveX < 0) {
							if (pages.currentIndex <= pages.size - 2) {
								pages.currentIndex++;
							}
						} else {
							if (pages.currentIndex > 0) {
								pages.currentIndex--;
							}
						}
					}

					moveX = pages.width * (-pages.currentIndex);

					$(pages).css(
							{
								'-webkit-transform' : 'translate3d(' + moveX
										+ 'px,0,0)',
								'-webkit-transition-duration' : '0.5s'
							});
				}
			});
	
	$(pages).on('webkitTransitionEnd','.pages', function(e) {
		$(pages).css({
			'-webkit-transition-duration' : ''
		});
		$('#content').trigger('releasePage',[pages.currentIndex]);
	});

	for ( var i = 0; i < pages.size; i++) {
		var page=Page(i);
		page.appendTo(pages);
	}
	
};

function createPages() {
	Pages(10, 0);
//	console.log('-->create pages.');
}