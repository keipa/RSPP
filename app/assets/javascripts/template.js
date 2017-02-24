$(document).on('turbolinks:load', function() {
	$('.update-description-topic').click(function() {
		var wasHidden = $('.hidden-template');
		var wasActive = $('.active-template');
		wasActive.removeClass('active-template').addClass('hidden-template')
		wasHidden.removeClass('hidden-template').addClass('active-template')
	})

});
