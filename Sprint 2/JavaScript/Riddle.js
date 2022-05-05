//Dictionary placeholder for database table 
var dictionary = new Object();

// Schema : dictionary.answer = "riddle"
dictionary.fire = "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?";
dictionary.that = "Mississippi has four S’s and four I’s. Can you spell that without using S or I?";
dictionary.w = "What is at the end of the rainbow?";
dictionary.wrong = "What word is always spelled wrong?";
dictionary.relationship = "What kind of ship has two mates but no captain?";

//Get page elements necessary for guessing game implementation
const refreshButton = document.getElementById("refreshButton");
const submitButton = document.getElementById("submitButton");
const guessStatus = document.getElementById("status");
const currClues = document.getElementById("riddle"); 
const userGuess = document.getElementById("answer");

var rightGuess = "";
var score = 0;
var isGuessing = false;

refreshButton.addEventListener("click", refreshClues);
submitButton.addEventListener("click", validateGuess);

function validateGuess() {
	
	//Flag that checks if the game has started (whether validateGuess() should run on press)
	if (!isGuessing) {
		return;
	}
	
	let guess = userGuess.value.toLowerCase();
	
	//Edge case: user hasn't guess anything yet but presses the check button
	if (guess.trim() == "") {
		return;
	}
	if (guess == rightGuess) {
		guessStatus.textContent = "Correct! Good job!";
		score += 1;
		isGuessing = false; //Stop runtime of game
	}
	else {
		guessStatus.textContent = "Try again!";
		if (score >= 1) {
			score -= 1;
		}	
	}
}

function refreshClues() { //Placeholder for backend script that queries database for guess-clues pairs

	isGuessing = true;
	
	let arrKeys = Object.keys(dictionary);
	let randInt = Math.floor(Math.random() * arrKeys.length);
	let currGuess = arrKeys[randInt];
	
	while (currGuess == rightGuess) {
		randInt = Math.floor(Math.random() * arrKeys.length);
		currGuess = arrKeys[randInt];
	}
	
	rightGuess = currGuess.toString();
	
	//Update displays. 
	currClues.textContent = dictionary[rightGuess];
	userGuess.value = "";
	guessStatus.textContent = "Score: " + score;
	
}





