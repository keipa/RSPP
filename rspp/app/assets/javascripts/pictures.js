$(document).on('turbolinks:load', function() {
    $.getScript("http://widget.cloudinary.com/global/all.js")
    $("#upload").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var urlImage = $("#upload").attr("image-url");
                var sendable = {
                    'image_url': result[0]['url']
                };
                $.ajax({
                    type: "POST",
                    url: urlImage,
                    dataType: 'json',
                    data: sendable
                });
            });
    });
});
