function flapBird() {
	
	//Simple image.src switch algorithm based on number of flaps and current src of birdy
	if (flapCount >= 9000) {
		birdy.src = "bird-3.png";
		console.log("Dead bird! Murder!!!");
		flapCount = -1;
	}
	else if (birdy.src.match("bird-1")) {
		birdy.src = "bird-2.png"; 
		flapCount += 1;
		console.log(flapCount);
	}
	else if (birdy.src.match("bird-2")) {
		birdy.src = "bird-1.png";
		flapCount += 1;
		console.log(flapCount);
	}
	
}

var flapCount = 0;
const birdy = document.getElementById('birdy');
birdy.addEventListener("click", flapBird);
