$(document).on('turbolinks:load', function() {
    var SURVEY;
    var SURVEY_QUESTIONS;
    var CURRENT_USER_ID;
    if (gon.surveyContent && window.currentUserId) {
        SURVEY = gon.surveyContent;
        SURVEY_QUESTIONS = JSON.parse(SURVEY.content);
        CURRENT_USER_ID = window.currentUserId;
        checkVotedUser(SURVEY.users) >= 0 ? renderResluts() : renderQuestions();
    }

    function checkVotedUser(users) {
        return users.split(',').indexOf(CURRENT_USER_ID);
    }

    function renderQuestions() {
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

    function addToggleToRadios() {
        $("input[name='answer-survey']").on('change', function(e) {
            $("input[name='answer-survey']").attr('checked', false);
            $(e.target).prop('checked', 'checked');
            $(e.target).attr('checked', 'checked');
        })
    }

    function renderQuestionBottom() {
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

    function renderResluts() {
        var container = $('.survey-content');
        container.find('.survey-content-question-list').remove();
        renderResultList();
        renderResultBottom();
    }

    function renderResultList() {
        var container = $('.survey-content');
        var resultList = $('<div/>').addClass('survey-content-result-list clearfix')
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
                        .text(percentCount)))

        }
        container.prepend(resultList);
    }

    function renderResultBottom() {
        $('.survey-total-count b').text(SURVEY.count_votes)
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
        renderResluts();
    }

    function getCheckedQuestion() {
        var radio = $("input[name='answer-survey']:checked")
        return {
            qId: radio.attr('question-id'),
            iVal: radio.next().text()
        }
    }

    $('#btn-create-survey').click(function() {
        var json = {
            survey: {
                title: $('#survey-title-input').val(),
                content: JSON.stringify(getQuestionVals()),
                count_votes: 0,
                closed: false,
                users: ''
            }
        }
        var controller = $('#btn-create-survey').attr('data-controller');
        throughAJAX(json, controller, "POST")
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

    function getQuestionVals() {
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
