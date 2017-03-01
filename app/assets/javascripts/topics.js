$(document).on('turbolinks:load', function() {
	var subtopics;
	$('.topic .topic-text').hover(function(e) {
		$('.subtopics-nav').hide();
		subtopics = $(e.target).parent().next();
		if (subtopics) {
			$(subtopics).css('display', 'flex');
		}
	})

	$('.navbar').mouseleave(function(e) {
		$('.subtopics-nav').hide();
	})
})
