$(document).on('turbolinks:load', function() {
    var CLOUDINARY_INFO = (function() {
        return {
            cloud_name: 'dzcon8dw0',
            upload_preset: 'fxk1eofn'
        }
    })()

    $.getScript("https://widget.cloudinary.com/global/all.js")

    $("#upload-picture-gallery").click(function(e) {
        cloudinary.openUploadWidget(CLOUDINARY_INFO,
            function(error, result) {
                var controller = $('#upload-picture-gallery').attr("data-controller");
                var redirectUrl = $('#upload-picture-gallery').attr("data-redirect");
                result.forEach(function(res) {
                    throughAJAX({
                        'picture': {
                            'image_url': res['url']
                        }
                    }, controller, function() {
                        window.location = redirectUrl
                    });
                })
            });
    });

    $("#upload-picture-news-post").click(function(event) {
        cloudinary.openUploadWidget(CLOUDINARY_INFO,
            function(error, result) {
                var imageInput = $("#news_post_image_url");
                imageInput.val(result[0]['url']);
                $("#upload-picture-news-post")[0].outerHTML = "<div><img id='loadedImage' src='" + result[0]['url'] + "'></div>"
            });
    });


    $("#upload-partner-picture").click(function(event) {
        cloudinary.openUploadWidget(CLOUDINARY_INFO,
            function(error, result) {
                var imageInput = $("#partner-image-url");
                imageInput.val(result[0]['url']);
                $("#loadedImage")[0].outerHTML = "<div><img id='loadedImage' src='" + result[0]['url'] + "'></div>"
            });
    });

    $("#add-partner-btn").click(function() {
        var partnerLink = $("#partner-link").val();
        var partnerImageUrl = $("#partner-image-url").val();
        var controller = $("#add-partner-btn").attr("data-controller");
        if ((checkLink(partnerLink)) && (partnerImageUrl)) {
            throughAJAX({
                'partner': {
                    'link': partnerLink,
                    'image_url': partnerImageUrl
                }
            }, controller);
        }
    })


    function throughAJAX(sendable, controller, callback) {
        $.ajax({
            type: "POST",
            url: controller,
            dataType: 'json',
            data: sendable,
            success: callback
        });
    }

    function checkLink(link) {
        var regexp = new RegExp(/(https?:\/\/){1}([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
        return regexp.test(link) ? true : false;
    }
});
