$(document).on('turbolinks:load', function() {

  $.getScript("https://widget.cloudinary.com/global/all.js")


  var CLOUDINARY_INFO = (function() {
    return {
        cloud_name: 'dzcon8dw0',
        upload_preset: 'fxk1eofn'
    }
  })()
  
    $(".add-partner-form-header .close").click(function(argument) {
        $(".add-partner-form").fadeOut(300);
    })

    var method = 'POST'

    $(".add-partner-single").click(function() {
        $("#partner-link").val("");
        $("#partner-image-url").val("");
        $("#loadedImage").hide();
        $(".add-partner-form").fadeIn(300);
    })

    var id = ""

    $(".update-partner-single").click(function() {
        var link = $(this).attr('data-link');
        var imageUrl = $(this).attr('data-imageUrl');
        id = $(this).attr('data-id');
        $("#partner-link").val(link);
        $("#partner-image-url").val(imageUrl);
        $("#loadedImage")[0].outerHTML = "<div><img id='loadedImage' src='" + imageUrl + "'></div>"
        $(".add-partner-form").fadeIn(300);
        method = 'PATCH'
    })

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
        if (id != "") {
            controller += "/" + id;
        }
        if ((checkLink(partnerLink)) && (partnerImageUrl)) {
            throughAJAX({
                'partner': {
                    'link': partnerLink,
                    'image_url': partnerImageUrl
                }
            }, controller, method);
            $(".add-partner-form").fadeOut(300);
        }
    })




    function checkLink(link) {
        var regexp = new RegExp(/(https?:\/\/){1}([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
        return regexp.test(link) ? true : false;
    }

})
