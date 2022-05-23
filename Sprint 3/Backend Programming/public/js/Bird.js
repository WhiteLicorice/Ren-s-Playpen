function flapBird() {
	
	//Simple image.src switch algorithm based on number of flaps and current src of birdy
	if (flapCount >= 9000) {
		birdy.src = "/images/bird-3.png";
		console.log("Dead bird! Murder!!! Over 9000!!!");
		submitScore();
	}
	else if (birdy.src.match("/images/bird-1")) {
		birdy.src = "/images/bird-2.png"; 
		flapCount += 1;
		console.log("Flap Counter: " + flapCount);
	}
	else if (birdy.src.match("/images/bird-2")) {
		birdy.src = "/images/bird-1.png";
		flapCount += 1;
		console.log("Flap Counter: " + flapCount);
	}
	
}

//	Function that submits score with dynamic hidden form + POST request upon reaching secret number of flaps
//	Function that submits score with dynamic hidden form + POST request upon reaching secret number of flaps
function submitScore(){
	form = document.createElement('form');
    form.setAttribute('method', 'POST');
   	form.setAttribute('action', '/games/score');
	form.setAttribute('target', 'dummyFrame');
   	scoreInput = document.createElement('input');
   	scoreInput.setAttribute('name', 'score');
   	scoreInput.setAttribute('type', 'hidden');
   	scoreInput.setAttribute('value', flapCount);
   	form.appendChild(scoreInput);
    document.body.appendChild(form);
    form.submit();   
}

var flapCount = 0;
const birdy = document.getElementById('birdy');
birdy.addEventListener("click", flapBird);
