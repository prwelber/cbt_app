$(document).ready(function () {
  console.log('DOM ready');

  var submitButton = document.getElementById('question-1-submit');

  submitButton.addEventListener('click', function (event) {
    console.log('clicked');
    var questionOneText = document.getElementById('question-1-textarea').value;
    console.log(questionOneText);
  });

});