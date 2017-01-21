$(document).on('turbolinks:load', function() {
  $(".add-partner-form-header .close").click(function(argument) {
    $(".add-partner-form").fadeOut(300);
  })

  $(".partner").click(function() {
    $("#partner-link").val("");
    $("#partner-image-url").val("");
    $(".add-partner-form").fadeIn(300);
  })
})