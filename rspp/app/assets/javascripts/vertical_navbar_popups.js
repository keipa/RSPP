$(document).on('turbolinks:load', function() {
  $(".arrow-for-subtopics")
    .mouseenter(function() {
      topicID = $(this).attr("data-topic-id");
      position = $(this).attr("data-position");
      $(".subtopics-dropdown-for-" + topicID).css('top', 250 + 40 * position + 'px')
      $(".subtopics-dropdown-for-" + topicID).show();
    })
    .mouseleave(function() {
      topicID = $(this).attr("data-topic-id");
      $(".subtopics-dropdown-for-" + topicID).hide();
    })
})
