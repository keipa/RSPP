$(document).on('turbolinks:load', function() {
    window.throughAJAX = function(sendable, controller, method, callback) {
        $.ajax({
            type: method,
            url: controller,
            dataType: 'json',
            data: sendable,
            success: callback ? callback.call() : undefined
        });
    }
});
