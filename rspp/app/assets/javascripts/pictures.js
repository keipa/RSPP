$(document).on('turbolinks:load', function() {
    $.getScript("https://widget.cloudinary.com/global/all.js")
    $("#upload").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var urlImage = $("#upload").attr("image-url");
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
});
