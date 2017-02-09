$(document).on('turbolinks:load', function() {
  $(".arrow-for-subtopics")
    .mouseenter(function() {
      topicID = $(this).attr("data-topic-id");
      position = $(this).attr("data-position");
      $(".subtopics-dropdown-for-" + topicID).css('top', 220 + 40 * position + 'px')
                                             .css('display', 'inline-block')
      $(".subtopics-dropdown-for-" + topicID).show();
    })

    $(".subtopics-dropdown").mouseleave(function() {
      topicID = $(this).attr("data-topic-id");
      $(".subtopics-dropdown-for-" + topicID).hide();
    })
})
