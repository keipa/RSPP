$(document).ready(function() {
    $(".login-btn").on("click", function(e) {
        e.stopPropagation();
        $(".user-actions").slideUp(250);
        setTimeout(function() {
            $(".login").slideDown(250);
        }, 150);
    })

    $(".signup-btn").on("click", function(e) {
        e.stopPropagation();
        $(".user-actions").slideUp(250);
        setTimeout(function() {
            $(".signup").slideDown(250);
        }, 150);
    });

    $("body").click(function(e) {
        if (($(e.target).closest("form").hasClass("login-container")) ||
            ($(e.target).closest("form").hasClass("signup-container"))) {
            return $(e.target)[0].type === "submit" ? true : false;
        }
        $(".signup").slideUp(250);
        $(".login").slideUp(250);
        setTimeout(function() {
            $(".user-actions").slideDown(250);
        }, 150);
    });

    // var maxNewsLength = 3;
    // addScroll($('.news-container'));

    // function addScroll(list) {
    //     if (list.children().length > maxNewsLength && !list.hasClass('scroller')) {
    //         list.addClass('scroller')
    //     }
    // }
})
