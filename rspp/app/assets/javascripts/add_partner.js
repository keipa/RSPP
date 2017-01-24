$(document).on('turbolinks:load', function() {

  $.getScript("https://widget.cloudinary.com/global/all.js")


  var CLOUDINARY_INFO = (function() {
    return {
        cloud_name: 'dzcon8dw0',
        upload_preset: 'fxk1eofn'
    }
  })()

  var partnerPosition = "";


  $(".add-partner-form-header .close").click(function(argument) {
    $(".add-partner-form").fadeOut(300);
  })

  $(".add-partner-single").click(function() {
    partnerPosition = $(this).attr("id");
    $("#partner-link").val("");
    $("#partner-image-url").val("");
    $("#loadedImage").hide();
    $(".add-partner-form").fadeIn(300);
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
        var pPosition = partnerPosition.match(/\d+/)[0];
        if ((checkLink(partnerLink)) && (partnerImageUrl)) {
            throughAJAX({
                'partner': {
                    'link': partnerLink,
                    'image_url': partnerImageUrl,
                    'position': pPosition
                }
            }, controller);
            $(".add-partner-form").fadeOut(300);
            $("#" + partnerPosition)[0].innerHTML = "<img src='" + partnerImageUrl +"'>"
            $("#" + partnerPosition).find("img").each(function() {
                $(this).css({"vertical-align": "0", "max-width": "100%", "max-height": "100%"});
            })
        }
    })




    function checkLink(link) {
        var regexp = new RegExp(/(https?:\/\/){1}([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/);
        return regexp.test(link) ? true : false;
    }




})
