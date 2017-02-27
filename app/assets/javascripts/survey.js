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
			renderResults();
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


	function clearContent() {
		var container = $('.survey-content');
		container.find($('.question')).remove();
		container.find($('.options-list')).remove();
		container.find($('.result-list')).remove();
	}

	////////QUESTIONS, WHEN USER NOT VOTE//////////////

	function renderQuestions() {
		clearContent();
		renderSurveyQuestion();
		renderQuestionList();
		renderQuestionBottom();
	}

	function renderSurveyQuestion() {
		var container = $('.survey-content');
		var title = $('<div/>').addClass('question').append('<h4>' + SURVEY.title + '</h4>');
		container.prepend(title);
	}

	function renderQuestionList() {
		var container = $('.survey-content');
		var questionList = $('<div/>').addClass('options-list')
		for (var i = 0; i < SURVEY_QUESTIONS.length; i++) {
			questionList
				.append($('<div/>').addClass('option')
					.append($('<input/>')
						.attr('type', 'radio')
						.attr('id', i)
						.attr('name', 'answer-survey')
						.attr('name', 'answer-survey'))
					.append($('<label/>').attr('for', i).text(SURVEY_QUESTIONS[i].body))
					.append($('<div/>').addClass('check')
						.append($('<div/>').addClass('inside'))))
		}
		container.append(questionList);
		addToggleToRadios();
	}

	function renderQuestionBottom() {
		var optionsList = $('.survey-content .options-list');
		var divVote = $('<div/>').addClass('text-right vote-btn-align')
		var btnVote = $('<a/>')
			.addClass('vote-btn')
			.text('Проголосовать')
			.on('click', sendResult)
		divVote.append(btnVote);
		optionsList.append(divVote);
	}


	////////// RESULTS, WHEN USER VOTE /////////////

	function renderResults() {
		clearContent();
		renderSurveyQuestion();
		renderResultList();
		renderResultBottom();
	}


	function renderResultList() {
		var container = $('.survey-content');
		var resultList = $('<div/>').addClass('result-list') /*clearContentfix*/
		var totalCount = Number(SURVEY.count_votes);
		for (var i = 0; i < SURVEY_QUESTIONS.length; i++) {
			if (totalCount == 0) {
				var percentCount = 0;
			} else {
				var percentCount = (SURVEY_QUESTIONS[i].count / totalCount) * 100;
			}
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
		container.append(resultList);
	}

	function renderResultBottom() {
		var resultList = $('.survey-content .result-list');
		var bottom = $('<div/>').addClass('text-right')
		var linkToDiscuss = $('<a/>')
			.attr('href', '/surveys/' + SURVEY.id)
			.addClass('link-discuss')
			.text('Перейти к обсуждению')
		bottom.append(linkToDiscuss);
		resultList.append(bottom);
	}


	///////// SEND RESULT WHEN USER VOTE ///////////

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
		}, controller, 'PATCH')
		renderResults();
	}

	function getCheckedQuestion() {
		var radio = $("input[name='answer-survey']:checked")
		return {
			qId: radio.attr('id'),
			iVal: radio.next().text()
		}
	}



	////////// CREATE SURVEY BUTTON IN ADMIN /////////

	$('#btn-create-survey').click(function() {
		console.log("BUTTON CLICKED")
		var valFromOptions = getOptionsVals();
		var titleSurvey = $('#survey-title-input').val().trim();
		if (valFromOptions.length == 0) {
			alertMessage('warning', 'Отсутствуют поля выбора', $('#btn-create-survey'))
			return;
		}
		if (titleSurvey == '' || !titleSurvey) {
			alertMessage('warning', 'Некорректное название опроса', $('#btn-create-survey'))
			return;
		}
		console.log("EVERYTHING IS OK")
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
			console.log("AJAX SENT")
			window.location.reload()
		})
	})



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
			.append($('<input/>').val(value).attr('type', 'text')
				.attr('placeholder', 'Вариант ответа')
				.addClass('input-option'))
			.append($('<span/>').addClass('glyphicon glyphicon-remove remove-option'))
	}

	function getOptionsVals() {
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
		var valFromOptions = getOptionsVals();
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
});
