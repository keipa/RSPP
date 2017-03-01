$(document).on('turbolinks:load', function() {
	$('.topic .topic-text').hover(function(e) {
		$('.subtopics-nav').hide();
		var subtopics = $(e.target).parent().next();
		if (subtopics) {
			$(subtopics).css({
				'display': 'flex'
			});
		}
		return;
	})

	$('.navbar').mouseleave(function(e) {
		$('.subtopics-nav').hide();
	})
})
