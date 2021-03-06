var enemyAmount;
var enemy;
var blockAmount;
var block;
var width;
var height;
var speed, espeed;	
var food;
var forever;
var limited;

function choose() {
	block = document.getElementById('obstacles');
	enemy = document.getElementById('enemy');
	width = document.getElementById('fWidth').value;
	height = document.getElementById('fHeight').value;
	speed = document.getElementById('speed').value;
	espeed = document.getElementById('speedE').value;
	food = Number(document.getElementById('food').value);
	forever = document.getElementById('continue');
	limited = document.getElementById('limit');
	
	if (width == "Really Small"){
		width = 100;
	}else if ( width == "Small"){
		width = 200;
	}else if ( width == "Average"){
		width = 500;
	}else if ( width == "Big"){
		width = 800;
	}else if ( width == "Really Big"){
		width = 1000;
	}
	
	if (height == "Really Small"){
		height = 100;
	}else if ( height == "Small"){
		height = 200;
	}else if ( height == "Average"){
		height = 500;
	}else if ( height == "Big"){
		height = 800;
	}else if ( height == "Really Big"){
		height = 1000;
	}
	
	if (speed == "Really Slow"){
		speed = '1000';
	}else if ( speed == "Slow"){
		speed = '600';
	}else if ( speed == "Average"){
		speed = '200';
	}else if ( speed == "Fast"){
		speed = '50';
	}else if ( speed == "Really Fast"){
		speed = '0';
	}
	
	/*if (foodSel == "A Very Little Bit"){
		food = 1;
	} else if ( foodSel == "A Little Bit"){
		food = (width*height)/100/50;
		console.log(food);
	} else if ( foodSel == "Average"){
		food = (width*height)/100/10;
		console.log(food);
	} else if ( foodSel == "A Large Amount"){
		food = (width*height)/100/4;
		console.log(food);
	} else if ( foodSel == "A Very Large Amount"){
		food = (width*height)/100/2;
		console.log(food);
	}
	
	if (block.checked){
		store('block',true);
		if (blockSel == "A Very Little Bit"){
			blockAmount = 1;
		} else if ( blockSel == "A Little Bit"){
			blockAmount = (width*height)/100/50;
		} else if ( blockSel == "Average"){
			blockAmount = (width*height)/100/10;
		} else if ( blockSel == "A Large Amount"){
			blockAmount = (width*height)/100/4;
		} else if ( blockSel == "A Very Large Amount"){
			blockAmount = (width*height)/100/2;
		}
	} else {
		blockAmount = 0;
		store('block',false);
	}*/
	
	if (block.checked){
		store('block',true);
		blockAmount = Number(document.getElementById('blockAmount').value);
	} else {
		blockAmount = 0;
		store('block',false);
	}
	
	if (enemy.checked){
		store('enemy',true);
		enemyAmount = Number(document.getElementById('enemyAmount').value);
		if (espeed == "Really Slow"){
			espeed = '1000';
		}else if (espeed == "Slow"){
			espeed = '600';
		}else if (espeed == "Average"){
			espeed = '200';
		}else if (espeed == "Fast"){
			espeed = '50';
		}else if (espeed == "Really Fast"){
			espeed = '0';
		}
	} else {
		enemyAmount = 0;
		store('enemy',false);
	}
	
	formCheck();
	console.log('enemy amount= '+ enemyAmount);
	store('enemyAmount',enemyAmount);
	store('blockAmount',blockAmount);
	store('width',width);
	store('height',height);
	store('speed',speed);
	store('enemySpeed',espeed);
	store('food',food);
	
	if (limited.checked) {
		document.location.href = "limit.html" ;
	}else if(forever.checked) {
		document.location.href = "continue.html" ;
	}
}

function formCheck(){
	var heightList = document.getElementById('fHeight');
	var widthList = document.getElementById('fWidth');
	var speedList = document.getElementById('speed');
	var speedEList = document.getElementById('speedE');
	var foodList = document.getElementById('food');
	var blockList = document.getElementById('blockAmount');
	var enemyList = document.getElementById('enemyAmount');
	
	var espeedError = document.getElementById("espeedError");
	var enemyError = document.getElementById("enemyError");
	var blockError = document.getElementById("blockError");
	var widthError = document.getElementById("widthError");
	var heightError = document.getElementById("heightError");
	var speedError = document.getElementById("speedError");
	var foodError = document.getElementById("foodError");

	
	var ready = 'true';
	
	if (width == ''){
		widthError.innerHTML = "Please choose a width for your field.";
		widthList.style.border = "1px solid red";
		ready = 'false';
	} else {
		widthError.innerHTML = "";
		widthList.style.border = "";
	}
	
	if (height == ''){
		heightError.innerHTML = "Please choose a height for your field.";
		heightList.style.border = "1px solid red";
		ready = 'false';
	} else {
		heightError.innerHTML = "";
		heightList.style.border = "";
	}
	
	if (speed == ''){
		speedError.innerHTML = "Please choose a speed for your snake.";
		speedList.style.border = "1px solid red";
		ready = 'false';
	} else {
		speedError.innerHTML = "";
		speedList.style.border = "";
	}
	
	if (enemy.checked){
		if (enemyAmount == ''){
			enemyError.style.color = "red";
			enemyList.style.border = "1px solid red";
			ready = 'false';
		} else {
			enemyError.style.color = "black";
			enemyList.style.border = "";
		}
		if (espeed == ''){
			espeedError.style.color = "red";
			speedEList.style.border = "1px solid red";
			ready = 'false';
		} else {
			espeedError.style.color = "black";
			speedEList.style.border = "";
		}
	} else {
		enemyError.style.color = "black";
		enemyList.style.border = "";
	}
	
	if (block.checked){
		if (blockAmount == ''){
			blockError.style.color = "red";
			blockList.style.border = "1px solid red";
			ready = 'false';
		} else {
			blockError.style.color = "black";
			blockList.style.border = "";
		}
	} else {
		blockError.style.color = "black";
		blockList.style.border = "";
	}
	
	if (food == ''){
			foodError.innerHTML = "Please choose the amount of food on your field.";
			foodList.style.border = "1px solid red";
			ready = 'false';
	} else {
			foodError.innerHTML = "";
			foodList.style.border = "";
	}
	
	if (limited.checked) {
		if (food + blockAmount > ((width*height)/100)-1){
			var e = food + blockAmount;
			var i = ((width*height)/100)-1;
			alert('Please make sure your food and obstacle amount do not add up to be greater than '+ i +'.\nRight now they add up to '+e+'.');
			ready = 'false';
		}
	} else if (forever.checked) {
		if (food + blockAmount > (width*height)/100/2){
			var e = food + blockAmount;
			var i = (width*height)/100/2;
			alert('Please make sure your food and obstacle amount do not add up to be greater than '+ i +'.\nRight now they add up to '+e+'.');
			ready = 'false';
		}
	}
	
	if (ready == 'false') {
		throw "stop execution";
	}
}
