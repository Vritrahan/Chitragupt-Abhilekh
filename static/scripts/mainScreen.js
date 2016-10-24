

var scrollToTag = function(id) {
  var section = $("#" + id);
  $('html,body').animate({scrollTop : section.offset().top},"slow");
}

var setColorToBlack = function(id) {
  var section = $("#" + id);
  section.css("color", "black");
}

$("#downButton").click(function(){
  scrollToTag("signUpContainer");
  setColorToBlack("sideFloatingPanel");
});

/*$("#downIconSignInScreen").click(function(){
  scrollToTag("signInContainer");
});*/
