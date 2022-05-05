var login = document.getElementById("login");

login.addEventListener("submit", function(event) {
	//Prevents the usual submit event
	event.preventDefault();
	//Get values of the username and password fields
	var username = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	//Log parsed values in console --- placeholder for backend script 
	console.log(username);
	console.log(pass);
})