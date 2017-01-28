$(document).on('turbolinks:load', function() {
    $("input[name='video_type']").change(function(e) {
        $("input[name='video_type']").attr('checked', false);
        $(e.target).prop('checked', 'checked');
        $(e.target).attr('checked', 'checked');
    })
    $('#video-add-button').on('click', function(e) {
        e.preventDefault()
        var url = $('#video-field').val();
        var key = 'AIzaSyCu1vVWWwzIZER_tZoEaHY2G60_9YZYAwo';
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            var videoId = match[2];
            $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=' + key + '&part=snippet&callback=?', function(data) {
                if (typeof(data.items[0]) != "undefined") {
                    var video = getVideoObject(data.items[0]);
                    var urlController = $('#video-field').attr('data-controller');
                    var urlRedirect = $('#video-field').attr('data-redirect')
                    throughAJAX(video, urlController, "POST", function() {
                        window.location = urlRedirect;
                    })
                } else {
                    console.log('video not exists');
                }
            });
        } else {
            console.log('wrong link')
        }
    })

    function getVideoObject(data) {
        return {
            video: {
                video_id: data.id,
                youtube_link: 'https://www.youtube.com/watch?v=' + data.id,
                iframe_link: 'https://www.youtube.com/embed/' + data.id,
                title: data.snippet.title,
                description: data.snippet.description,
                published_at: data.snippet.publishedAt.substring(0, 10),
                type_video: getRadioVal()
            }
        }
    }

    function getRadioVal() {
        return $("input[name='video_type']:checked").val()
    }

    /////// Main page //////////////

    var myConfObj = {
        iframeMouseOver: false
    }

    var target;

    $(window).focus()

    $(window).focusout(function() {
        if (myConfObj.iframeMouseOver) {
            var clickedVideoSrc = $(target).attr('src');
            var swapSrc = $('.video-block iframe.main-video').attr('src');
            $('.video-block iframe.main-video').attr('src', clickedVideoSrc);
            $(target).attr('src', swapSrc);
        }
    });

    $('.video-iframe').mouseover(function(e) {
        myConfObj.iframeMouseOver = true;
        $(window).focus()
        target = $(e.target);

    });
    $('.video-iframe').mouseout(function() {
        myConfObj.iframeMouseOver = false;
        $(window).focus()
    });


    $('.video-block iframe').click(function(e) {
        if ($(e.target).hasClass('main-video')) {
            return;
        }
        var clickedVideoSrc = $(e.target).attr('src');
        console.log(clickedVideoSrc)
        var swapSrc = $('.video-block iframe.main-video').attr('src');
        $('.video-block iframe.main-video').attr('src', clickedVideoSrc);
        $(e.target).attr('src', swapSrc);
    })

});
