$(document).on('turbolinks:load', function() {

	var mouseDown, x, y, initWidth = $(window).innerWidth() * 0.9;

	$('.burger-menu').click(function() {
		showList();
		pinListeners();
	})

	function pinListeners() {
		$('body').on('touchstart', function(event) {
			if ($('.burger-list').css('display') == 'none') {
				return;
			}
			mouseDown = true;
			x = event.originalEvent.changedTouches[0].clientX;
		});
		$('body').on('touchmove', function(event) {
			if (mouseDown) {
				var deltaX = x - event.originalEvent.changedTouches[0].clientX;
				var newWidth = (initWidth - deltaX);
				if (newWidth > initWidth) {
					return;
				}
				$('.burger-list').css('width', newWidth);
			}
		});
	}

	function unpinListeners() {
		$('.burger-list').off();
	}

	function showList() {
		$('.burger-list').width(initWidth).css('transition', 'width .3s').show('slide', {
			direction: 'left'
		});
		$('body').css({
			'overflow': 'hidden',
			'height': $('.burger-list').height()
		});
	}

	function hideList() {
		$('.burger-list').hide('slide', {
			direction: 'left'
		})
		$('body').css({
			'overflow':'auto',
			'height':'auto'
		})
		unpinListeners();
	}

	document.addEventListener('touchend', function(e) {
		if (mouseDown) {
			var deltaX = x - e.changedTouches[0].clientX;
			if (deltaX > 200) {
				hideList();
			} else {
				showList();
			}
			mouseDown = false;
		};
	});
})
