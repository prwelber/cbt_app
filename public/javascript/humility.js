$(document).ready(function () {
  console.log('humility.js linked');
  var nextQuestionCounter = 1,
      nextButton = $(".next-question");


  var nextQuestion = function nextQuestion (divNum) {
    nextButton.on('click', function (event) {
      if ($(event.target).parent().siblings()[nextQuestionCounter].style.display === "") {
         $(event.target).parent().siblings()[nextQuestionCounter].style.display = "inline";
        $("body").animate({"scrollTop": window.scrollY+400}, 1250);
        $(".next-question").eq(nextQuestionCounter - 1).hide();
        nextQuestionCounter += 1;
      }
    });
  }()









});



