$(document).on('turbolinks:load', function() {

	$(".partner-form-header .close").click(function() {
		$(".partner-form").fadeOut(300);
		$(".shadow").fadeOut(300);
	})

	$("#add_partner_btn").click(function() {
		$("#partner-link").val("");
		$("#loadedImage").hide();
		$("#partner-image-input").val("");
		$(".partner-form").fadeIn(300);
		$(".shadow").fadeIn(300);
	})

	function checkLink(link) {
		var regexp = new RegExp(/(https?:\/\/){1}([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
		return regexp.test(link) ? true : false;
	}

})
