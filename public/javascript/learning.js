$(document).ready(function () {
  console.log('DOM ready');
  var username = $("#username").text();
  var submitButton = document.getElementById("learning-submit-button");

  submitButton.addEventListener('click', function (event) {
  	event.preventDefault();
  	console.log('clicked');
    $(".message-box").empty();
  	
  	var answer1 = "Question: " + $("#question-1").text() + "Answer: " + $("#question-1-textarea").val(),
  			answer2 = "\nQuestion: " + $("#question-2").text() + "Answer: " + $("#question-2-textarea").val(),
  			answer3 = "\nQuestion: " + $("#question-3").text() + "Answer: " + $("#question-3-textarea").val();

  	var answer1HTML = "<p>Question: "+$("#question-1").text() + "<br><p>Answer: " + $("#question-1-textarea").val(),
  			answer2HTML = "<p>Question: "+$("#question-2").text() + "<br><p>Answer: " + $("#question-2-textarea").val(),
  			answer3HTML = "<p>Question: "+$("#question-3").text() + "<br><p>Answer: " + $("#question-3-textarea").val();


  	data = {
  		username: username,
  		user_id: 1,
  		answer1: answer1,
  		answer2: answer2,
  		answer3: answer3
  	};
  	
  	$.ajax({
  		type: "post",
  		url: '/users/'+username+'/learning/create',
  		data: data,
  		success: function (stuff) {
  			//console.log(stuff);
  			$(".answer-one").append(answer1HTML);
  			$(".answer-two").append(answer2HTML);
  			$(".answer-three").append(answer3HTML);

  		},
  		error: function (err) {
  			console.log(err);
  		}
  	})
  	$(".message-box").append("<h3>Entries Submitted!</h3>")

  })

});