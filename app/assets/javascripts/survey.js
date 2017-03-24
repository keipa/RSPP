$(document).on('turbolinks:load', function() {

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
		this.previousElementSibling.remove()
		$(this).remove()
	})

	function createOptionField(value) {
		return $('<div/>').addClass('options-content')
			.append($('<input/>').val(value)
				.attr("name","survey[answers_attributes][][text]")
				.attr('type', 'text')
				.attr('placeholder', 'Вариант ответа')
				.addClass('input-option form-input'))
			.append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
	}

})
