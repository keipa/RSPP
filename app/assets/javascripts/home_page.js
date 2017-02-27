$(document).on('turbolinks:load', function() {

  if ($(".partners-carousel")) {
    $(".partners-carousel").slick({
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
      arrows: false
    })
  }

})
