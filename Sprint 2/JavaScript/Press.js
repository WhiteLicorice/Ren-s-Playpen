//Get needed elements on html doc
const tiles = document.querySelectorAll(".tile"); 
const progressBar = document.getElementById("innerBar");
const outerBar = document.getElementById("outerBar");
const scoreHeader = document.getElementById("headerScore");
//Progess measured in pixels
const fullProgress = 707;
const incrProgress = 7;

//Time in milliseconds
const minTime = 200;
const maxTime = 1000;

//Flags for keeping track of game loop
let prevTile;
let score = 0;
let isRunning = false; 

//Lets the end user start the game by clicking the big bar
outerBar.addEventListener("click", gameStart);

//Generate random time in milliseconds
function randomTime(min, max) {
	return (Math.round(Math.random() * (max - min) + min));
}

//Get random tile from the array of tiles queried above
function randomTile(tiles) {
	let idx = Math.floor(Math.random() * tiles.length);
	let tile = tiles[idx];
	
	//Loop that guarantees a different tile everytime randomTiles() is run
	while (tile === prevTile) {
		idx = Math.floor(Math.random() * tiles.length);
		tile = tiles[idx];
	}
	
	//Store previously chosen tile to guarantee uniqueness
	prevTile = tile;
	return tile; 
}

//Continuuously light up tiles until the progress bar is maxed (bomb explodes)
function light() {
	let randTime = randomTime(minTime, maxTime);
	let tile = randomTile(tiles);
	tile.style.backgroundColor = "red";
	
	setTimeout(() => {
		tile.style.backgroundColor = "green";
		let curWidth = parseInt(progressBar.offsetWidth);
		progressBar.style.width = (curWidth + incrProgress + "px")
		if (progressBar.offsetWidth < fullProgress) {
			light();
		}
		else {
			isRunning = false; 
		}
	}, randTime);
}

//Light a single tile once, used to combo tiles in gameplay
function lightOnce() {
	let randTime = randomTime(minTime, maxTime);
	let tile = randomTile(tiles);
	tile.style.backgroundColor = "red";
	
	setTimeout(() => {
		tile.style.backgroundColor = "green";
		let curWidth = parseInt(progressBar.offsetWidth);
		progressBar.style.width = (curWidth + incrProgress + "px")
	}, randTime);
}

//Turns off tiles and reduces progress bar for each tile turned off, also incrementing score by 1 for each tile
function off(e) {
	if (!e.isTrusted || this.style.backgroundColor == "green") {
		return;
	}
	this.style.backgroundColor = "green";
	lightOnce();
	score++;
	headerScore.textContent = ("Press the Button (Score: " + score + ")");
	let curWidth = parseInt(progressBar.offsetWidth);
	progressBar.style.width = (curWidth - incrProgress + "px");
}

//Function that starts the game loop and resets flags 
function gameStart() {
	if (isRunning) {
		return;
	}
	progressBar.style.width = "0px";
	tiles.forEach(tile => tile.addEventListener("click", off));
	score = 0;
	headerScore.textContent = ("Press the Button (Score: " + score + ")");
	isRunning = true;
	light();
}
