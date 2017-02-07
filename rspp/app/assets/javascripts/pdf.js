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

	function checkRequiredFields() {
		$('.form-part :input[required]').each(function(i, input) {
			if (!complecatedVerification($(input))) {
				$(input).addClass('form-control-warning');
			}
		})
		var firstIncorrectInput = $('.pdf-page-content .form-control-warning')[0];
		if (firstIncorrectInput) {
			var positionPage = $(firstIncorrectInput).closest('.form-part').attr('data-position');
			redirectToFormPage(Number(positionPage));
		} else {
			return;
		}
	}

	function clearIncorrectFields() {
		$('.pdf-page-content .form-control-warning').removeClass('form-control-warning')
	}

	$('.btn-generate-form').click(function() {
		clearIncorrectFields();
		checkRequiredFields();
	})
})
