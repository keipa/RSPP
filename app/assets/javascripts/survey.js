$(document).on('turbolinks:load', function() {
	var SURVEY;
	var SURVEY_QUESTIONS;
	var CURRENT_USER_ID;
	surveyContent = $(".survey-content").attr("data-survey-content")
	currentUserId = $(".survey-content").attr("data-user-id")

	if (surveyContent) {
		SURVEY = surveyContent.replace(/&quot;/g, '"')
		SURVEY = JSON.parse(SURVEY)
		SURVEY_QUESTIONS = JSON.parse(SURVEY.content);
		if (currentUserId) {
			CURRENT_USER_ID = currentUserId;
			checkVotedUser(SURVEY.users) >= 0 ? renderResults() : renderQuestions();
		} else {
			renderResults()
		}
	}

	function checkVotedUser(users) {
		return users.split(',').indexOf(CURRENT_USER_ID);
	}

	function addToggleToRadios() {
		$("input[name='answer-survey']").on('change', function(e) {
			$("input[name='answer-survey']").attr('checked', false);
			$(e.target).prop('checked', 'checked');
			$(e.target).attr('checked', 'checked');
		})
	}

	function renderCommonBottom() {
		var container = $('.survey-content');
		$('.survey-content .survey-content-bottom').remove();
		var contentBottom = $('<div/>').addClass('survey-content-bottom')
		container.append(contentBottom);
	}

	function renderSurveyTotal() {
		var contentBottom = $('.survey-content-bottom')
		contentBottom.append($('<div/>').addClass('survey-total')
			.append('<div/>')
			.addClass('survey-total-count')
			.html('Проголосовали: <b>' + SURVEY.count_votes + '</b>'))
	}

	function renderQuestions() {
		clearList();
		renderQuestionList();
		renderQuestionBottom();
	}

	function renderQuestionList() {
		var container = $('.survey-content');
		var questionList = $('<div/>').addClass('survey-content-question-list')
		for (var i = 0; i < SURVEY_QUESTIONS.length; i++) {
			questionList
				.append($('<div/>').addClass('survey-question')
					.append($('<input/>')
						.attr('type', 'radio')
						.attr('question-id', i)
						.attr('name', 'answer-survey'))
					.append($('<div/>').addClass('question-text')
						.append(SURVEY_QUESTIONS[i].body)))

		}
		container.prepend(questionList);
		addToggleToRadios();
	}

	function renderQuestionBottom() {
		renderCommonBottom();
		renderSurveyTotal();
		var bottomContent = $('.survey-content-bottom');
		var divVote = $('<div/>').addClass('survey-vote')
		var btnVote = $('<button/>')
			.addClass('btn btn-primary btn-xs')
			.attr('id', 'btn-vote-survey')
			.attr('type', 'button')
			.attr('name', 'button')
			.text('Проголосовать')
			.on('click', sendResult)
		divVote.append(btnVote);
		bottomContent.append(divVote);
	}

	function renderResults() {
		$('.survey-comments').show();
		clearList();
		renderResultBottom();
		renderResultList();
	}

	function clearList() {
		var container = $('.survey-content');
		$('.survey-content-question-list').remove();
		$('.survey-content-result-list').remove();
	}

	function renderResultList() {
		var container = $('.survey-content');
		var resultList = $('<div/>').addClass('survey-content-result-list ')/*clearListfix*/
		var totalCount = Number(SURVEY.count_votes);
		for (var i = 0; i < SURVEY_QUESTIONS.length; i++) {
			var percentCount = (SURVEY_QUESTIONS[i].count / totalCount) * 100;
			resultList
				.append($('<div/>').addClass('survey-result')
					.append($('<div/>').addClass('result-text')
						.text(SURVEY_QUESTIONS[i].body))
					.append($('<div/>')
						.addClass('progress-bar')
						.append($('<div/>').addClass('progress-bar-filled')
							.css('width', percentCount + '%')))
					.append($('<div/>').addClass('count-result')
						.append(SURVEY_QUESTIONS[i].count))
					.append($('<div/>').addClass('percent-result')
						.text(Math.floor(percentCount))))

		}
		container.prepend(resultList);
	}

	function renderResultBottom() {
		renderCommonBottom();
		renderSurveyTotal();
	}


	function sendResult() {
		var obj = getCheckedQuestion();
		var qId = obj.qId;
		var iVal = obj.iVal;
		var controller = '/surveys/' + SURVEY.id + '/vote';
		SURVEY_QUESTIONS[qId].count += 1;
		SURVEY.count_votes += 1;
		SURVEY.users += (CURRENT_USER_ID + ',')
		throughAJAX({
			survey: {
				content: JSON.stringify(SURVEY_QUESTIONS),
				users: SURVEY.users,
				count_votes: SURVEY.count_votes,
			}
		}, controller, 'PUT')
		renderResults();
	}

	function getCheckedQuestion() {
		var radio = $("input[name='answer-survey']:checked")
		return {
			qId: radio.attr('question-id'),
			iVal: radio.next().text()
		}
	}

	$('#btn-create-survey').click(function() {
		var valFromOptions = getQuestionVals();
		var titleSurvey = $('#survey-title-input').val().trim();
		if (valFromOptions.length == 0) {
			alertMessage('warning', 'Отсутствуют поля выбора', $('#btn-create-survey'))
			return;
		}
		if (titleSurvey == '' || !titleSurvey) {
			alertMessage('warning', 'Некорректное название опроса', $('#btn-create-survey'))
			return;
		}
		var json = {
			survey: {
				title: titleSurvey,
				content: JSON.stringify(valFromOptions),
				count_votes: 0,
				closed: false,
				users: ''
			}
		}
		var controllerPOST = $('#btn-create-survey').attr('data-controller');
		throughAJAX(json, controllerPOST, "POST", function() {
			window.location.reload()
		})
	})

	$('.survey-content-add-field').click(function() {
		$('.survey-content').prepend(createOptionField());
	})

	$('.survey-content').click(function(e) {
		if ($(e.target).hasClass('remove-option')) {
			$(e.target).parent().remove()
		}
	})

	function createOptionField(value) {
		return $('<div/>').addClass('options-content')
			.append($('<input/>').val(value).attr('type', 'text')
				.attr('placeholder', 'Вариант ответа')
				.addClass('input-option'))
			.append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
	}

	function getQuestionVals() {
		var vals = $('.input-option');
		var arr = [];
		$.each(vals, function(i, v) {
			if (($(v).val().trim() != '' || $(v).val().trim()) && (v.clientWidth > 0)) {
				arr.push({
					body: $(v).val(),
					count: 0
				})
			}
		})
		return arr;
	}

	$('.survey-hide').click(function(e) {
		if ($('.survey-hide').attr('state') == 'opened') {
			$('.survey-hide').attr('state', 'closed');
			$('.survey-hide').attr('title', 'Показать опрос')
			$('.survey-hide').html('<span class="fa fa-angle-right"></span>')
			$('.survey-body').hide('slide', {
				direction: 'left'
			}, 100)
		} else {
			$('.survey-hide').attr('state', 'opened');
			$('.survey-hide').html('<span class="fa fa-angle-left"></span>')
			$('.survey-hide').attr('title', 'Спрятать опрос')
			$('.survey-body').show('slide', {
				direction: 'left'
			}, 100);
		}
	})

	/////////////////////////////////////////////////

	$(".add-survey").click(function() {
		$("input").val("");
		$(".options-content").remove();
		$(".survey-admin").fadeToggle(250);
	})

	var controllerPUT;

	$(".edit-survey").click(function(event) {
		$(".options-content").remove();
		surveyTitle = $(event.target).attr("data-survey-title");
		surveyOptions = JSON.parse($(event.target).attr("data-survey-options"));
		controllerPUT = $(event.target).attr("data-controller");

		$(".survey-title-input").val(surveyTitle)

		surveyOptions.forEach(function(option) {

			$(".survey-content").prepend(
				createOptionField(option.body)
			);

		});


		$(".survey-admin-edit").fadeToggle(250);
	})


	$('#btn-edit-survey').click(function() {
		var valFromOptions = getQuestionVals();
		var titleSurvey = $('.survey-title-input').val().trim();
		if (valFromOptions.length == 0) {
			alertMessage('warning', 'Отсутствуют поля выбора', $('#btn-edit-survey'))
			return;
		}
		if (titleSurvey == '' || !titleSurvey) {
			alertMessage('warning', 'Некорректное название опроса', $('#btn-edit-survey'))
			return;
		}
		var json = {
			survey: {
				title: titleSurvey,
				content: JSON.stringify(valFromOptions),
				count_votes: 0,
				closed: false,
				users: ''
			}
		}
		throughAJAX(json, controllerPUT, "PUT", function() {
			window.location.reload()
		})
	})


	/////////////////////////////////////////////////

	$('.survey-close').click(function(e) {
		closeSurvey();
	})

	function closeSurvey() {
		var controller = '/surveys/' + SURVEY.id + '/update';
		throughAJAX({
			survey: {
				closed: true
			}
		}, controller, 'PUT', function() {
			window.location.reload();
		})
	}
});