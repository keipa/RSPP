$(document).on('turbolinks:load', function() {
    $('#video-add-button').on('click', function(e) {
        e.preventDefault();
        var url = $('#video-field').val();
        var key = 'AIzaSyCu1vVWWwzIZER_tZoEaHY2G60_9YZYAwo';
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            var videoId = match[2];
            $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=' + key + '&part=snippet&callback=?', function(data) {
                if (typeof(data.items[0]) != "undefined") {
                    var video = getVideoObject(data.items[0]);
                    // fillHiddenFields(video);

                    var urlController = $('#video-field').attr('data-url');
                    var urlRedirect = $('#video-field').attr('data-redirect')
                    $.ajax({
                        type: "POST",
                        url: urlController,
                        dataType: 'json',
                        data: video,
                        success: function(result) {
                            console.log(result)
                            window.location = urlRedirect 
                        }
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
            video_id: data.id,
            youtube_link: 'https://www.youtube.com/watch?v=' + data.id,
            iframe_link: 'https://www.youtube.com/embed/' + data.id,
            title: data.snippet.title,
            description: data.snippet.description,
            published_at: data.snippet.publishedAt.substring(0, 10)
        }
    }

    function fillHiddenFields(video) {

    }
});
