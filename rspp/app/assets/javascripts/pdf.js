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

	$('#1-1')




})
