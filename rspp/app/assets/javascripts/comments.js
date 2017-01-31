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


    /////// Main page //////////////

    var iframeMouseOver = false

    var target;

    $(window).focus()

    function swapVideoSrc() {
        var clickedVideoSrc = $(target).attr('src');
        var swapSrc = $('.video-block iframe.main-video').attr('src');
        $('.video-block iframe.main-video').attr('src', clickedVideoSrc);
        $(target).attr('src', swapSrc);
    }

    function swapComments() {
        var clickedVideoComments = $(target).next().children();
        var swapVideoComments = $('.video-block .main-video-preview-comments').children();
        $('.video-block .main-video-preview-comments').text('');
        $('.video-block .main-video-preview-comments').append(clickedVideoComments);
        $(target).next().text('');
        $(target).next().append(swapVideoComments);
    }

    $(window).focusout(function() {
        if (iframeMouseOver) {
            swapVideoSrc();
            swapComments();
            $(window).focus();
        }
    });

    $('.video-iframe').mouseover(function(e) {
        iframeMouseOver = true;
        $(window).focus()
        target = $(e.target);

    });
    $('.video-iframe').mouseout(function() {
        iframeMouseOver = false;
        $(window).focus()
    });


    $('.video-block iframe').click(function(e) {
        if ($(e.target).hasClass('main-video')) {
            return;
        }
        var clickedVideoSrc = $(e.target).attr('src');
        var swapSrc = $('.video-block iframe.main-video').attr('src');
        $('.video-block iframe.main-video').attr('src', clickedVideoSrc);
        $(e.target).attr('src', swapSrc);
    })

})
