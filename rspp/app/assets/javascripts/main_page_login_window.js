$(document).ready(function() {
    $(".login-btn").on("click", function(e) {
        e.stopPropagation();
        // Shadow is used only in adaptive mode
        if ($(this).hasClass("shadow-on")) {
            $(".shadow").fadeIn(250);
            $(".login-window").fadeIn(450);
        } else {
            $(".user-actions").slideUp(250);
            setTimeout(function() {
                $(".login-window").slideDown(250);
            }, 150);
        }
    })

    $(".signup-btn").on("click", function(e) {
        e.stopPropagation();
        // Shadow is used only in adaptive mode
        if ($(this).hasClass("shadow-on")) {
            $(".shadow").fadeIn(250);
            $(".signup-window").fadeIn(450);
        } else {
            $(".user-actions").slideUp(250);
            setTimeout(function() {
                $(".signup-window").slideDown(250);
            }, 150);
        }
    });

    $("body").click(function(e) {
        if (($(e.target).closest("form").hasClass("login-window-container")) ||
            ($(e.target).closest("form").hasClass("signup-window-container"))) {
            return $(e.target)[0].type === "submit" ? true : false;
        }

        if ($(".vertical-navbar").is(":visible")) {

            $(".shadow").fadeOut(250);
            $(".login-window").fadeOut(250);
            $(".signup-window").fadeOut(250);

        } else {

            $(".signup-window").slideUp(250);
            $(".login-window").slideUp(250);
            setTimeout(function() {
                $(".user-actions").slideDown(250);
            }, 150);

        }
    });
})
