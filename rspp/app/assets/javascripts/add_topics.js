$(document).on('turbolinks:load', function() {

	var num = $(".numOfSubtopics").val();
	if (num) {
		$(".subtopicsInfo")[0].innerHTML = "";
		for (i = 0; i < num; i++) {
			$(".subtopicsInfo")[0].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">' +
				'<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][smart_id]">' +
				'<input type="hidden" name="topic[subtopics][' + i + '][link]">' +
				'<hr>';
		}

		$(".numOfSubtopics").on("change", function() {
			$(".subtopicsInfo")[0].innerHTML = "";
			for (i = 0; i < this.value; i++) {
				$(".subtopicsInfo")[0].innerHTML += '<input placeholder="Название подраздела" name="topic[subtopics][' + i + '][text]">' +
					'<input placeholder="Ссылка на материал" name="topic[subtopics][' + i + '][smart_id]">' +
					'<input type="hidden" name="topic[subtopics][' + i + '][link]">' +
					'<hr>';
			}
		});

		$(".add-topic-sign").on("click", function() {
			$(".add-topic-form").show();
		})

		$(".close").on("click", function() {
			$(".add-topic-form").hide();
		})
	}

	$('#add_topic_button').click(function(e) {
		var link = $('#smart_id_topic').val();
		if (link == 'galleries' || link == 'about') {
			link = '/' + link;
		} else {
			link = '/topics/' + link;
		}
		$('#link_topic').val(link)
		getSubtopicVals(0);
	})

	function getSubtopicVals(num) {
		if (num == 0) {
			var subtopicsInfo = $(".subtopicsInfo")[0];
			var inputsLinkSubtopics = $(subtopicsInfo).children("input[name*='link']");
			var inputsSmartIdSubtopics = $(subtopicsInfo).children("input[name*='smart_id']");
			$(inputsLinkSubtopics).each(function(index,el) {
				$(el).val('/topics/' + $(inputsSmartIdSubtopics[index]).val())
			})
		} else if (num == 1) {

		}
	}

	$('#add_subtopics_button').click(function(e) {
		var link = $('#smart_id_topic').val();
		if (link == 'galleries' || link == 'about') {
			link = '/' + link;
		} else {
			link = '/topics/' + link;
		}
		$('#link_topic').val(link)
	})
})
