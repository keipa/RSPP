$(document).on('turbolinks:load', function() {
    $(".comment-size").each(function(i, size) {
        if ($(size).text().trim() == '' || $(size).text().trim() == '0') {
            $(size).closest(".comments-body").hide();
        }
    });

    $(".show-comments").click(function(e) {
        e.preventDefault();
        var containerId = $(e.target).closest("div[class^='comments-content-").attr('data-id');
        $(".comments-content-" + containerId + " .panel-body").toggle('slow');
        $(".comments-content-" + containerId + " .show-comments").toggleClass("active")
        showOrHide(containerId)
    })

    function showOrHide(containerId) {
        if ($(".comments-content-" + containerId + " .show-comments").hasClass("active")) {
            $(".comments-content-" + containerId + " .show-comments").html('');
            $(".comments-content-" + containerId + " .show-comments")
                .append($('<span/>').addClass('glyphicon glyphicon-chevron-up'))
                .append(' Спрятать комментарии')
        } else {
            $(".comments-content-" + containerId + " .show-comments").html('');
            $(".comments-content-" + containerId + " .show-comments")
                .append($('<span/>').addClass('glyphicon glyphicon-chevron-down'))
                .append(' Показать комментарии')
        }
    }

})
