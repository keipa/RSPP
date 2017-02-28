$(document).on('turbolinks:load', function() {
	var contentList = $(".comments-content");
	var numberOfComments = $(contentList).find('.single-comment').length;
	$(contentList).animate({
		scrollTop: numberOfComments * 120
	}, 1000);
})
