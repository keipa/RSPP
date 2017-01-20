$(document).on('turbolinks:load', function() {
    $.getScript("https://widget.cloudinary.com/global/all.js")
    $("#upload-picture").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                console.log(error, result)
                var urlController = $("#upload-picture").attr("image-url");
                var urlRedirect = $('#upload-picture').attr('data-redirect')
                result.forEach(function(res) {
                    var sendable = {
                        'image_url': res['url']
                    };
                    $.ajax({
                        type: "POST",
                        url: urlController,
                        dataType: 'json',
                        data: sendable,
                        success: function() {
                            window.location = urlRedirect
                        }
                    });
                })
            });
    });
});
