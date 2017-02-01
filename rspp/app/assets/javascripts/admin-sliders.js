$(document).on('turbolinks:load', function() {

  $.getScript("https://widget.cloudinary.com/global/all.js")


  var CLOUDINARY_INFO = (function() {
    return {
        cloud_name: 'dzcon8dw0',
        upload_preset: 'fxk1eofn'
    }
  })()

    $(".add-slide-form-header .close").click(function(argument) {
        $(".add-slide-form").fadeOut(300);
    })

    $(".add-slide-btn").click(function() {
        $("#slide-image-url").val("");
        $("#loadedImage").hide();
        $(".add-slide-form").fadeIn(300);
    })

    $("#upload-slide-picture").click(function(event) {
        cloudinary.openUploadWidget(CLOUDINARY_INFO,
            function(error, result) {
                var imageInput = $("#slide-image-url");
                imageInput.val(result[0]['url']);
                $("#loadedImage")[0].outerHTML = "<div><img id='loadedImage' src='" + result[0]['url'] + "'></div>"
            });
    });

    function createSlide(imageUrl, text) {
      return $('<div/>').addClass('slide')
        .append($('<img/>').addClass('slide-image').attr('src', imageUrl)
        .append($('<input/>').attr('id', 'slide-image-url').attr('type', 'hidden').val(imageUrl)))
        .append($('<textarea/>').addClass('slide-text').val(text))
    }

    $("#add-slide-btn").click(function() {
        var slideImageUrl = $("#slide-image-url").val();
        var slideText = $("#slide-text").val();
        $(".add-slide-btn").after(createSlide(slideImageUrl, slideText));
        $(".add-slide-form").fadeOut(300);
    })

    function createHiddenDivWithSlideInfo(image, text, i) {
      return $("<div/>")
            .append($("<input/>")
              .attr('type', 'hidden')
              .attr('name', 'slider[slides][' + i + '][text]')
              .val(text))
            .append($("<input/>")
              .attr('type', 'hidden')
              .attr('name', 'slider[slides][' + i + '][image_url]')
              .val(image))
    }

    $(".add-slider-form").on('submit', function() {
      $(".slide").each(function(index) {
        slideImg = $(this).find("img").attr('src')
        slideTxt = $(this).find("textarea").val();
        $(this).append(createHiddenDivWithSlideInfo(slideImg, slideTxt, index));
      })

    })

})
