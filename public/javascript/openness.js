$(document).ready(function () {
  console.log('openness.js linked');
  var nextQuestionCounter = 1,
      nextButton = $(".next-question");


  var nextQuestion = function nextQuestion (divNum) {
    nextButton.on('click', function (event) {
      if ($(event.target).parent().siblings()[nextQuestionCounter].style.display === "") {
         $(event.target).parent().siblings()[nextQuestionCounter].style.display = "inline";
        $("body").animate({"scrollTop": window.scrollY+400}, 1250);
        nextQuestionCounter += 1;
      }
    });
  }()









});



