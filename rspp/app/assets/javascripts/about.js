$(document).on('turbolinks:load', function() {
    var activeLink = localStorage.getItem('activeLink');
    if (activeLink) {
        setActivePage(activeLink);
    }

    $('.orspp-link-content').hide();
    $('.about-body .description > div.active').show();
    $('.partitions-list a').click(function(e) {
        var linkName = $(e.target).attr('href');
        setActivePage(linkName.substr(1));
        saveInLocalStorage(linkName);
    })

    function hideAboutContents() {
        $('.orspp-link-content').hide();
        $('.orspp-link-content').removeClass('active');
    }

    function setActivePage(link) {
        hideAboutContents();
        $(link + '-content').addClass('active').show();
    }

    function saveInLocalStorage(link) {
        localStorage.setItem('activeLink', link);
    }

    $('.orspp-root').click(function() {
        hideAboutContents();
        $('#orspp-content').addClass('active').show();
        saveInLocalStorage('#orspp');
    })
});
