$(document).on('turbolinks:load', function() {

    $.getScript("https://widget.cloudinary.com/global/all.js")
    $("#upload-picture").click(function(e){
        throughAJAX(e);
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


    $("#upload-partner-picture").click(function(event) {
        cloudinary.openUploadWidget({
                cloud_name: 'dzcon8dw0',
                upload_preset: 'fxk1eofn'
            },
            function(error, result) {
                var imageInput = $("#partner-image-url");
                imageInput.val(result[0]['url']);
                $("#loadedImage")[0].outerHTML = "<div><img id='loadedImage' src='" + result[0]['url'] +"'></div>"
            });
    });

    $("#add-partner-btn").click(function() {
        var partnerLink = $("#partner-link").val();
        var partnerImageUrl = $("#partner-image-url").val();
        var controller = $("#add-partner-btn").attr("data-controller");
        if ((checkLink(partnerLink)) && (partnerImageUrl)) {
            throughAJAX({'partner': {'link': partnerLink, 'image_url':partnerImageUrl}}, controller);
        }
    })


    function throughAJAX(sendable, controller) {
        $.ajax({
            type: "POST",
            url: controller,
            dataType: 'json',
            data: sendable
        });
    }

    function checkLink(link) {
        var regexp = new RegExp(/(https?:\/\/){1}([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
        if (regexp.test(link)) {
            return true;
        } else {
            return false;
        }
    }
});










        // cloudinary.openUploadWidget({
        //         cloud_name: 'dzcon8dw0',
        //         upload_preset: 'fxk1eofn'
        //     },
        //     function(error, result) {
        //         console.log(error, result)
        //         var urlController = $(event.target).attr("image-url");
        //         //var urlRedirect = $(event.target).attr('data-redirect')
        //         var partnerLink = $(".partner-link").val();
        //         if (checkLink(partnerLink)) {
        //             result.forEach(function(result) {
        //                 var sendable = {
        //                     'link': partnerLink,
        //                     'image_url': result[0]['url']
        //                 };
        //                 $.ajax({
        //                     type: "POST",
        //                     url: urlController,
        //                     dataType: 'json',
        //                     data: sendable,
        //                     // success: function() {
        //                     //     window.location = urlRedirect
        //                     // }
        //                 });
        //             })
        //         }
        //     });
