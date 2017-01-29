$(document).on('turbolinks:load', function() {
    window.alertMessage = function(type, text, element) {
        var message = $('<div/>').addClass('alert-message alert-message-' + type)
        message.text(text);
        element.append(message);
        element.css('position','relative')
        element.css('outline','none')
        $(message).show()
        $(message).show().delay(3000).fadeOut(function() {
          element.find(message).remove()
        });
    }

})
