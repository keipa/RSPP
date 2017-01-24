$(document).on('turbolinks:load', function() {

    $('#btn-create-survey').click(function() {
        var json = {
            survey: {
                title: $('#survey-title-input').val(),
                content: JSON.stringify(getCheckedVal()),
                count_votes: 0,
                closed: false
            }
        }
        var controller = $('#btn-create-survey').attr('data-controller');
        console.log(json)
        throughAJAX(json, controller)
    })

    $('.survey-content-add-field').click(function() {
        $('.survey-content').prepend(createOptionField());
    })

    $('.survey-content').click(function(e) {
        if ($(e.target).hasClass('remove-option')) {
            $(e.target).parent().remove()
        }
    })

    function createOptionField() {
        return $('<div/>').addClass('options-content')
            .append($('<input/>').attr('type', 'text')
                .attr('placeholder', 'Вариант ответа')
                .addClass('input-option'))
            .append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
    }

    function getCheckedVal() {
        var vals = $('.input-option');
        var arr = [];
        $.each(vals, function(i, v) {
            arr.push({
                body: $(v).val(),
                count: 0
            })
        })
        return arr;
    }
});
