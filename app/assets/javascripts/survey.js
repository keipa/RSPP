$(document).on('turbolinks:load', function() {

  i = 10000;

	$('.survey-content-add-field').click(function() {
		$('.survey-content .survey-content-add-field').before(createOptionField());
	})

	$('.remove-option').click(function() {
		ID = this.previousElementSibling.previousElementSibling.value
		$.ajax({
      type: "DELETE",
      url: "/admin/answers/" + ID,
      dataType: 'json',
      data: { id: ID }
    })
    $(this).closest(".option").remove()
		$(this).remove()
	})

	function createOptionField(value) {
    i += 1
		return $('<div/>').addClass('options-content')
			.append($('<input/>').val(value)
				.attr("name","survey[answers_attributes]["+ i +"][text]")
				.attr('type', 'text')
				.attr('placeholder', 'Вариант ответа')
				.addClass('input-option form-input'))
			.append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
	}

})
