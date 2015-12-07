console.log('index.js linked');
$(document).ready(function() {

	//turns loginModal on and off
	var loginModal = function loginModal () {
		var modal = $("#login-modal"),
				loginButton = $("#login-button"),
				closeLoginModal = $("#close-login-modal");

		loginButton.on('click', function (event) {
			console.log('modal should open');
			modal.fadeIn("slow");
			modal.css("display", "inline");
		});

		closeLoginModal.on('click', function (event) {
			console.log('modal should close');
			modal.css("display", "none");
		})
	};

var signUpModal = function signUpModal () {
	var signUpModal = $("#signup-modal"),
			signUpButton = $("#signup-button"),
			closeSignUpModal = $("#close-signup-modal");

	signUpButton.on('click', function (event) {
		console.log('signup modal should open');
		signUpModal.fadeIn("slow");
		signUpModal.css("display", "inline");
	});

	closeSignUpModal.on('click', function (event) {
		signUpModal.css("display", "none");
	});
};


//call functions
signUpModal();
loginModal();



});


