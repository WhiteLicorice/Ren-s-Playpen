var registration = document.getElementById("registration");

registration.addEventListener("submit", function(event) {
	//Prevents the usual submit event
	event.preventDefault();
	//Get values of the username, email, and password fields
	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value;
	var pass = document.getElementById('password').value;
	//Log parsed values in console --- placeholder for backend script 
	console.log(username);
	console.log(email);
	console.log(pass);
	
})