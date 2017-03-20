$(document).on('turbolinks:load', function() {
  activePhotoSlider = $('.active-photo-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    asNavFor: '.other-photos-slider'
  });

  // wip
  otherPhotosSlider = $('.other-photos-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.active-photo-slider',
    arrows: false,
    centerMode: true,
    focusOnSelect: true
  });

  $('.photo').click(function() {
    activePhotoSlider.slick('slickGoTo', this.id, false)
    otherPhotosSlider.slick('slickGoTo', this.id, false)
    $(".photo-modal").fadeIn(300);
    $(".shadow").fadeIn(300);
  })

})
