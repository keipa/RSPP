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
    $("#upload-picture-2").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var imageInput = $("#upload-picture-2>input");
                imageInput.val(result[0]['url']);
            });
    });
});
