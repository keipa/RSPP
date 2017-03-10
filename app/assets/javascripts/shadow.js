$(document).on('turbolinks:load', function() {
  $(".shadow").click(function() {
    $(".modal-window").fadeOut(300)
    $(".shadow").fadeOut(300)
    $('.burger-menu').hide('slide', {
      direction: 'left'
    })
  })
})
