$(document).on('turbolinks:load', function() {
	var iframeMouseOver = false

	var target;

	$(window).focus();

	function swapVideoSrc() {
		var clickedVideoSrc = $(target).attr('src');
		var swapSrc = $('.video-block iframe.main-video-iframe').attr('src');
		$('.video-block iframe.main-video-iframe').attr('src', clickedVideoSrc);
		$(target).attr('src', swapSrc);
	}

	$(window).focusout(function() {
		if (iframeMouseOver) {
			swapVideoSrc();
			$(window).focus();
		}
	});

	$('.video-iframe').mouseover(function(e) {
		$(window).focus();
		iframeMouseOver = true;
		target = $(e.target);
	});

	$('.video-iframe').mouseout(function() {
		iframeMouseOver = false;
		$(window).focus();
	});
})
