$(document).on('turbolinks:load', function() {
	$('.edit-topic').click(function() {
    $(".topic-content").toggle();
    $(".edit-topic-content").toggle();
	})

});
