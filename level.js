var FIELD_WIDTH = 500;
var FIELD_HEIGHT = 500;
var BOX_WIDTH = 10;
var BOX_HEIGHT = 10;

var speed = 200;

var currentX;
var currentY;

var DIRECTION_UP = 1;
var DIRECTION_RIGHT = 2;
var DIRECTION_DOWN = 3;
var DIRECTION_LEFT=4;

var direction = DIRECTION_RIGHT;

var interval;

var foodX=[];
var foodY=[];
var snakeX=[];
var snakeY=[];
var numOfFood= 1;

var best;
var run = 1;

var start;
var resume;

function clearRect(x, y) {
	var c=document.getElementById("gameField");
	var ctx=c.getContext("2d");
	ctx.clearRect(x,y,BOX_WIDTH,BOX_WIDTH);
}

function fillRect(x, y, color) {
	var c=document.getElementById("gameField");
	var ctx=c.getContext("2d");
	ctx.fillStyle=color;
	ctx.fillRect(x,y,BOX_WIDTH,BOX_HEIGHT);
}
function checkStart(){
	if (start != 'running') {
		startGame();
	} else {
		return;
	}
}

function checkResume(){
	if (resume != 'running') {
		resumeGame();
	} else {
		return;
	}
}

function startGame() {
	start = 'running';
	var c=document.getElementById("gameField");
	var ctx=c.getContext("2d");
	ctx.clearRect(0,0,FIELD_WIDTH,FIELD_HEIGHT);
	drawFood();
	currentX = FIELD_WIDTH / 2;
	currentY = FIELD_HEIGHT / 2;
	clearRect(currentX,currentY);
	
	resumeGame();
}

function resumeGame() {
	interval = setInterval("animate()", speed);
	resume = 'running';
}

function pauseGame() {
	clearInterval(interval);
	resume = 'stopped';
}

function animate() {
	switch (direction) {
	case DIRECTION_UP:
		currentY-=BOX_WIDTH;
		break;
	case DIRECTION_RIGHT:
		currentX+=BOX_WIDTH;
		break;
	case DIRECTION_DOWN:
		currentY+=BOX_WIDTH;
		break;
	case DIRECTION_LEFT:
		currentX-=BOX_WIDTH;
		break;	
	}
	
	var foodPosition = checkForFood(currentX, currentY);
	if (foodPosition == -1) {
		//we didn't hit food
		//since we are not deleting tail box the snake will grow at the head
		clearTail();
	} else {
		//we hit food
		removeFood(foodPosition);
	}
	
	draw(currentX,currentY);
	if (foodX.length == 0){
		run++;
		level(run);
		alert('Level '+run);
		end();
		if (speed != 0){
			speed = speed-10;
		}
		numOfFood = numOfFood+2;
		startGame();
	}
	if (checkForBody(currentX, currentY, false)) {
		alert('Game Over');
		almostEnd();
		run = 1;
		level(run);
		speed = 200;
		numOfFood= 1;
	}
	checkForBoundary();
}

//checks if the snake has a box with coordinates x,y
function checkForBody(x, y, includeHead){
	var limit = (includeHead) ? snakeX.length : snakeX.length-1;
	for (var i=0; i<limit; i++){
		if (x==snakeX[i] && y==snakeY[i]) {
			return true;
		}
	}
	return false;
}

function end(){
	start = 'stopped';
	pauseGame();
	direction = DIRECTION_RIGHT;
	foodX=[];
	foodY=[];
	snakeX=[];
	snakeY=[];

}

function almostEnd(){
	bestScore();
	end();
}

function bestScore(){
	var minusL = run-1;
	var bestScore1 = read('level1');
	var bestScore2 = read('level2');
	var bestScore3 = read('level3');
	
	var bestScore1P = read('level1P');
	var bestScore2P = read('level2P');
	
	if (bestScore3 == 'null'){
		bestScore3 = 0;
	}
	
	console.log('best score 1= '+bestScore1 +', best score 2= '+ bestScore2+', best score 3= '+bestScore3+', minus L = '+ minusL);
	if (minusL>bestScore3){
		var choice = confirm("Congratulations!\nYou have beaten one of our best score!\nWould you like your score to be displayed in the Leaderboard?");
		if (choice){
			var person = prompt("Please enter your name","Enter Name Here");
			if (minusL>bestScore3 && minusL<=bestScore2){
				store('level3',minusL);
				store('level3P',person);
			} else if (minusL>bestScore2 && minusL<=bestScore1){
				store('level3',bestScore2);
				store('level3P',bestScore2P);
				
				store('level2',minusL);
				store('level2P',person);
			} else if (minusL>bestScore1){
				store('level3',bestScore2);
				store('level3P',bestScore2P);
				
				store('level2',bestScore1);
				store('level2P',bestScore1P);
				
				store('level1',minusL);
				store('level1P',person);
			}
		}
	}
}

//this function checks if a box at x,y coordinates
//matches with any food boxes
//if it does it returns true, if not then false
function checkForFood(x, y){
	for (var i=0; i<foodX.length; i++){
		if (x==foodX[i] && y==foodY[i]) {
			return i;
		}
	}
	return -1;

}

function removeFood(position) {
	foodX.splice(position,1);
	foodY.splice(position,1);
}

function checkForBoundary() {
	if (currentX<0 || currentY<0 || currentX > FIELD_WIDTH-BOX_WIDTH || currentY > FIELD_HEIGHT-BOX_HEIGHT) {
		alert('Game Over');
		almostEnd();
		speed = 200;
		run = 1;
		numOfFood= 1;
		level(1);
	}
}

document.onkeypress=keyWasPressed;  //I tell JS to call my function whenever a key is pressed

function keyWasPressed(e){
	var keyCode = e.charCode; //this tells me what button was clicked
	
	switch (keyCode) {
	case 119:
		//go up since w was pressed
		if (direction !== DIRECTION_DOWN || snakeX.length == 1) {
			direction = DIRECTION_UP;
		}
		break;
	case 115:
		//go down since s was pressed
		if (direction !== DIRECTION_UP || snakeX.length == 1) {
			direction = DIRECTION_DOWN;
		}
		break;
	case 97:
		//go left since a was pressed
		if (direction !== DIRECTION_RIGHT || snakeX.length == 1) {	
			direction = DIRECTION_LEFT;
		}
		break;
	case 100:
		//go right since d was pressed
		if (direction !== DIRECTION_LEFT || snakeX.length == 1) {		
			direction = DIRECTION_RIGHT;
		}
		break;
		
	}
	//console.log('changed direction. Key code is '+ keyCode);
}

//this function clears the tail of the snake
function clearTail() {
	clearRect(snakeX[0],snakeY[0]);
	snakeX.splice(0,1);
	snakeY.splice(0,1);
}

function draw(x,y) {
	snakeX.push(x);
	snakeY.push(y);
	fillRect(x,y,"#FF0000");
}

//this function creates an array with numOfFood food boxes
//with random coordinates and draws them on the field
function drawFood(){
	for (var i=0; i<numOfFood; i++) {
		addOneFood();
	}
	console.log("total food: " + foodX.length);
}

function addOneFood() {
	var foodx = Math.floor(Math.floor((Math.random()*490)+1)/10)*10;
	var foody = Math.floor(Math.floor((Math.random()*490)+1)/10)*10;
		
	if (checkForFood(foodx, foody) == -1 && checkForBody(foodx, foody, true) == false) {
		foodX.push(foodx);
		foodY.push(foody);
		fillRect(foodx,foody,"#000000");
	} else {
		addOneFood();
	}
}

function level(level) {
	findBest();
	var e = document.getElementById("level");
	e.innerHTML = "You are on level " + level + ".";
	var e = document.getElementById("best");
	e.innerHTML = "Your best score is level " + best + ".";
	console.log('speed is ' + speed);
}

function findBest() {
	best = read('bestLevel');
	if (best == ''){
		best=1;
	}
	if (best < run) {
		best = run;
	}
	store('bestLevel',best);
}
