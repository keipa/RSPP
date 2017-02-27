$(document).on('turbolinks:load', function() {
    $(".comment-size").each(function(i, size) {
        if ($(size).text().trim() == '' || $(size).text().trim() == '0') {
            $(size).closest(".comments-body").hide();
        }
    });

    $(".video-block").click(function(e) {
        if ($(e.target).hasClass('show-comments')) {
            commentChange(e);
        }
    })

    $(".survey .show-comments, .video-item .show-comments").click(function(e) {
        commentChange(e);
    })

    function commentChange(e) {
        var containerId = $(e.target).closest("div[class^='comments-content-").attr('data-id');
        $(".comments-content-" + containerId + " .panel-body").slideToggle('slow');
        $(".comments-content-" + containerId + " .show-comments").toggleClass("active")
        showOrHide(containerId)
    }

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
