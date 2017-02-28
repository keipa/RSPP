$(document).on('turbolinks:load', function() {

  $("#survey-form").on('submit', function() {
    var options = []
    $(".input-option").each(function() {
      options.push({ body: $(this).val(), count: 0 })
    })
    $(this).append(
      $("<input/>").attr("name", "survey[content]").attr("type", "hidden")
        .val(JSON.stringify(options))
    )
  })
})
