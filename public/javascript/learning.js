$(document).ready(function () {
  console.log('learning.js linked');


  var nextButton = $(".next-question");


	var nextQuestion = function nextQuestion (divNum) {

	  nextButton.on('click', function (event) {
	  	console.log('hiiiii');
	  	var counter = 2
  		$(".question:nth-child(3)").css("display", "inline");
	  	$("body").animate({"scrollTop": window.scrollY+400}, 1000);

	  	if ($(".next-question").parent().siblings()[counter].style.display === "") {
	  		$(".next-question").parent().siblings()[counter].style.display === "inline";
	  		$("body").animate({"scrollTop": window.scrollY+400}, 1000);
	  	}

	  });
	}






nextQuestion();
});



