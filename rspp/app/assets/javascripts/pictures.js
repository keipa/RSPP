$(document).on('turbolinks:load', function() {
    $.getScript("https://widget.cloudinary.com/global/all.js")
    $("#upload-picture").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var urlImage = $("#upload-picture").attr("image-url");
                result.forEach(function(res) {
                    var sendable = {
                        'image_url': res['url']
                    };
                    $.ajax({
                        type: "POST",
                        url: urlImage,
                        dataType: 'json',
                        data: sendable
                    });
                })
            });
    });
    $("#upload-picture-news-post").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var imageInput = $("#news_post_image_url");
                imageInput.val(result[0]['url']);
                $("#upload-picture-news-post")[0].outerHTML = "<div><img id='loadedImage' src='" + result[0]['url'] +"'></div>"
            });
    });
});
