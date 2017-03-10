$(document).on('turbolinks:load', function() {

	$('.burger-menu-icon').click(function() {
		$('.burger-menu').css('transition', 'width .3s').show('slide', {
			direction: 'left'
		});
		$(".shadow").fadeIn(300);
	})
})
