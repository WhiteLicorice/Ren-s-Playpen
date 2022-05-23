/* 
//Dictionary placeholder for database table 
var dictionary = new Object();

dictionary.rainbow = "(After, Arch, Color, Wet)";
dictionary.flower = "(Fragrant, Colorful, Alive, Pollen)";
dictionary.apple = "(Tree, White, Crunchy, Fruit)";
dictionary.dog = "(BFF, Animal, Sniff, Fur)";
dictionary.mermaid = "(Tail, Girl, Myth, Sea)";
 */
//Get page elements necessary for guessing game implementation
const refreshButton = document.getElementById("refreshButton");
const submitButton = document.getElementById("submitButton");
const guessStatus = document.getElementById("status");
const currClues = document.getElementById("clues"); 
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
		submitScore();
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

//	Function that submits score with dynamic hidden form + POST request upon a correct guess
function submitScore(){
	form = document.createElement('form');
    form.setAttribute('method', 'POST');
   	form.setAttribute('action', '/games/score');
	form.setAttribute('target', 'dummyFrame');
   	scoreInput = document.createElement('input');
   	scoreInput.setAttribute('name', 'score');
   	scoreInput.setAttribute('type', 'hidden');
   	scoreInput.setAttribute('value', 1);
   	form.appendChild(scoreInput);
    document.body.appendChild(form);
    form.submit();   
}


