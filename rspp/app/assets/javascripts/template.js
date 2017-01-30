$(document).on('turbolinks:load', function() {
	var activeLink = localStorage.getItem('activeLink');
	if (activeLink) {
		setActivePage(activeLink);
	}

	$('.orspp-link-content').hide();
	$('.template-body .description > div.active').show();
	$('.partitions-list a').click(function(e) {
		var linkName = $(e.target).attr('href');
		setActivePage(linkName.substr(1));
		saveInLocalStorage(linkName);
	})

	function hidetemplateContents() {
		$('.orspp-link-content').hide();
		$('.orspp-link-content').removeClass('active');
	}

	function setActivePage(link) {
		hidetemplateContents();
		$(link + '-content').addClass('active').show();
	}

	function saveInLocalStorage(link) {
		localStorage.setItem('activeLink', link);
	}

	$('.orspp-root').click(function() {
		hidetemplateContents();
		$('#orspp-content').addClass('active').show();
		saveInLocalStorage('#orspp');
	})

	$('.update-description-topic').click(function() {
		var wasHidden = $('.hidden-template');
		var wasActive = $('.active-template');
		wasActive.removeClass('active-template').addClass('hidden-template')
		wasHidden.removeClass('hidden-template').addClass('active-template')
	})
});
