////////// FIELD FOR OPTION /////////

	$('.survey-content-add-field').click(function() {
		$('.survey-content .survey-content-add-field').before(createOptionField());
	})

	$('.survey-content').click(function(e) {
		if ($(e.target).hasClass('remove-option')) {
			$(e.target).parent().remove()
		}
	})

	function createOptionField(value) {
		return $('<div/>').addClass('options-content')
			.append($('<input/>').val(value)
				.attr("name","survey[answers_attributes][][text]")
				.attr('type', 'text')
				.attr('placeholder', 'Вариант ответа')
				.addClass('input-option'))
			.append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
	}
