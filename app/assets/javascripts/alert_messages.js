$(document).on('turbolinks:load', function() {
	window.alertMessage = function(type, text, element, time) {
		var message = $('<div/>').addClass('alert-message alert-message-' + type)
		message.text(text);
		element.append(message);
		element.css('outline', 'none')
		$(message).show()
		if (!time) {
			$(message).show().delay(3000).fadeOut(function() {
				element.find(message).remove()
			});
		} else {
			$(message).show().delay(time).fadeOut(function() {
				element.find(message).remove()
			});
		}
	}


})
