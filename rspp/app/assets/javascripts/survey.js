$(document).on('turbolinks:load', function() {

    $('#survey-vote-btn').click(function() {

    })

    $('.survey-content-add-field').click(function() {
        $('.survey-content').prepend(createOptionField());
    })

    $('.survey-content').click(function(e) {
      if($(e.target).hasClass('remove-option')) {
        $(e.target).parent().remove()
      }
    })

    function createOptionField() {
        return $('<div/>').addClass('options-content')
            .append($('<input/>').attr('type', 'text')
                .attr('placeholder', 'Вариант ответа')
                .addClass('input-options'))
            .append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
    }

    function getCheckedVal() {

    }
});
