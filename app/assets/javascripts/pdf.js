$(document).on('turbolinks:load', function() {
	$('.form-part').hide();
	$('.pdf-page-content .active').show();
	checkNavigation();
	$('.btn-prev-form, .btn-next-form').click(function(e) {
		switchForm(e);
	})

	function switchForm(e) {
		var allForms = $('.form-part');
		var activeForm = $('.pdf-page-content .active');
		var indexActive = $(allForms).index($(activeForm));
		if ($(e.target).hasClass('btn-prev-form')) {
			toggleActive(allForms, indexActive, 'prev');
			checkNavigation();
		} else if ($(e.target).hasClass('btn-next-form')) {
			toggleActive(allForms, indexActive, 'next');
			checkNavigation();
		}
	}

	function toggleActive(forms, index, dir) {
		if (dir == 'prev') {
			if (index - 1 < 0) {
				return;
			} else {
				$(forms[index - 1]).addClass('active');
			}
		} else if (dir == 'next') {
			if (index + 1 > forms.length - 1) {
				return
			} else {
				$(forms[index + 1]).addClass('active');
			}
		}
		$(forms[index]).removeClass('active');
		$(forms[index]).hide();
	}


	function checkNavigation() {
		var allForms = $('.form-part');
		var activeForm = $('.pdf-page-content .active');
		var indexActive = $(allForms).index($(activeForm))
		$(allForms[indexActive]).show();
		if (indexActive == 0) {
			$('.btn-prev-form').hide();
			$('.btn-next-form').show();
			return;
		} else if (indexActive == allForms.length - 1) {
			$('.btn-prev-form').show();
			$('.btn-next-form').hide();
			return;
		}
		$('.btn-prev-form').show();
		$('.btn-next-form').show();
	}

	function hidePages() {
		$('.form-part').removeClass('active').hide();
	}

	function showPage(positionPage) {
		var pageToShow = $('.form-part')[positionPage];
		$(pageToShow).addClass('active').show();
	}

	function redirectToFormPage(positionPage) {
		hidePages();
		showPage(positionPage);
		checkNavigation();
	}

	function complecatedVerification(input) {
		// complecated verify, bad words
		// warning alerts
		switch (true) {
			default: if (!$.trim($(input).val())) {
				return false;
			} else {
				return true;
			}
		}
	}

	function addAlertMessages(elements) {
		// $(elements).each(function(i, element) {
		// 	alertMessage('warning', 'Некорректные данные', $(element).closest('div'), 5000)
		// })
	}

	function checkRequiredFields(e) {
		var currentPage = $(e.target).closest('.form-part');
		$(currentPage).find(':input[required]').each(function(i, input) {
			if (!complecatedVerification($(input))) {
				$(input).addClass('form-control-warning');
			}
		})
		var incorrectInputs = $(currentPage).find('.form-control-warning');
		var firstIncorrectInput = incorrectInputs[0];
		if (firstIncorrectInput) {
			var positionPage = currentPage.attr('data-position');
			redirectToFormPage(Number(positionPage));
			addAlertMessages(incorrectInputs);
		} else {
			return;
		}
	}

	function clearIncorrectFields() {
		$('.pdf-page-content .form-control-warning').removeClass('form-control-warning')
	}

	$('.btn-next-form').click(function(e) {
		clearIncorrectFields();
		checkRequiredFields(e);
	})




	//////// checkbox check //////
	$('.checkbox-cell input').click(function(e) {
		if ($(e.target).attr('checked')) {
			$(e.target).removeAttr('checked');
		} else {
			$(e.target).attr('checked', true);
		}
	})

	function startSpinner() {
		$('.spinner').show()
		$('.spinner').spin({
			lines: 13, // The number of lines to draw
			length: 28, // The length of each line
			width: 14, // The line thickness
			radius: 42, // The radius of the inner circle
			scale: 1, // Scales overall size of the spinner
			corners: 1, // Corner roundness (0..1)
			color: '#000', // #rgb or #rrggbb or array of colors
			opacity: 0.25, // Opacity of the lines
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			className: 'spinner', // The CSS class to assign to the spinner
			top: '50%', // Top position relative to parent
			left: '50%', // Left position relative to parent
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			position: 'absolute' // Element positioning
		})
	}

	function stopSpinner() {
		$('.spinner').hide();
	}












	$(".finish-button").click(function() {
		var pdfData = {}

		$("input").each(function() {
			if (this.type == "checkbox") {
				pdfData[this.id] = this.checked
			} else {
				pdfData[this.id] = this.value
			}

		})

		var registrationForm;

		$.ajax({
			type: "GET",
			url: "registration_card",
			async: true
		}).done(function(response) {
			registrationForm = response

			for (var valueID in pdfData) {
				if (pdfData.hasOwnProperty(valueID)) {
					if (typeof(pdfData[valueID]) != "boolean") {
						registrationForm = registrationForm.replace("%INS-id-" + valueID + "%", pdfData[valueID])
					} else if (pdfData[valueID] == true) {
						registrationForm = registrationForm
							.replace(
								"<input id=\"" + valueID + "\" type=\"checkbox\" class=\"registration-card-checkbox\">",
								"<input id=\"" + valueID + "\" type=\"checkbox\" class=\"registration-card-checkbox\" checked>"
							)
					}
				}
			}

			$("#registration_toPDF_email").val(registrationForm)


			$.ajax({
				type: "GET",
				url: "statement",
			}).done(function(response) {
				statementForm = response

				statementForm = statementForm.replace("%INS-id-name%", pdfData[13])

				$("#statement_toPDF_email").val(statementForm)

				$.ajax({
					type: "GET",
					url: "bill",
				}).done(function(response) {
					billForm = response

					$("#bill_toPDF_email").val(billForm)


					$("#send-email-form").submit()
				})
			})
		})

	})

















	$("#get-pdf").click(function() {
		startSpinner();
		setTimeout(stopSpinner, 4000);

		var pdfData = {}

		$("input").each(function() {
			if (this.type == "checkbox") {
				pdfData[this.id] = this.checked
			} else {
				pdfData[this.id] = this.value
			}

		})

		var registrationForm;

		$.ajax({
			type: "GET",
			url: "registration_card",
			async: true
		}).done(function(response) {
			registrationForm = response

			for (var valueID in pdfData) {
				if (pdfData.hasOwnProperty(valueID)) {
					if (typeof(pdfData[valueID]) != "boolean") {
						registrationForm = registrationForm.replace("%INS-id-" + valueID + "%", pdfData[valueID])
					} else if (pdfData[valueID] == true) {
						registrationForm = registrationForm
							.replace(
								"<input id=\"" + valueID + "\" type=\"checkbox\" class=\"registration-card-checkbox\">",
								"<input id=\"" + valueID + "\" type=\"checkbox\" class=\"registration-card-checkbox\" checked>"
							)
					}
				}
			}

			$("#registration_toPDF").val(registrationForm)


			$.ajax({
				type: "GET",
				url: "statement",
			}).done(function(response) {
				statementForm = response

				statementForm = statementForm.replace("%INS-id-name%", pdfData[13])

				$("#statement_toPDF").val(statementForm)

				$.ajax({
					type: "GET",
					url: "bill",
				}).done(function(response) {
					billForm = response

					$("#bill_toPDF").val(billForm)


					$("#send-PDF-form").submit()
				})
			})
		})


	})

})
