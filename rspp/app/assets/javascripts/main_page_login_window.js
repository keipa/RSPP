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

$(".wrapper").click(function(e) {
  if (($(e.target).closest("form").hasClass("login-container")) || 
      ($(e.target).closest("form").hasClass("signup-container"))) {
    if (($(e.target)[0].type == "submit")) {
      return true;
    } else {
      return false;
    }
  }
  $(".signup").slideUp(250);
  $(".login").slideUp(250);
  setTimeout(function() {
    $(".user-actions").slideDown(250);
  }, 150);
});