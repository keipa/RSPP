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
                    alertMessage('warning', 'Видео не существует', $('#video-add-button'))
                }
            });
        } else {
            alertMessage('warning', 'Некорректная ссылка на видео', $('#video-add-button'))
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



});
