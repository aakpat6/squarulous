/* TODO: Implement collision detection between obstacles */

/* Initialize HTML elements */
var canvas = document.getElementById("myCanvas");
canvas.setAttribute('tabindex', '0');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.focus();
var ctx = canvas.getContext("2d");

/* Deal with window resize */
window.onresize = function(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

/* Make the 3 objects */
var hero = {
	speed: 5,
	x: canvas.width/2,
	y: canvas.height/2,
};

var target = {
	x: 0,
	y: 0
};

function Obstacle() {	
	var speedfactor = 5;
	var tmpdy = Math.random() * speedfactor;
	var tmpdx = Math.random() * speedfactor;
	this.x = 32 + (Math.random() * (canvas.width - 64));
	this.y = 32 + (Math.random() * (canvas.height - 64));
	this.dx = tmpdx;
	this.dy = tmpdy;
	
	/* Start the obstacle on the top or the right? */
	var randStart = Math.floor(Math.random() * 2);
	if (randStart == 0) this.y = 5;
	else this.x = 5;
}

/* Initialize variables */
var obstacles = [];
var score = 0;
var keysDown = {};

/* Key listeners */
canvas.addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false)

canvas.addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false)

/* Moves the target to a random location on the canvas */
function moveTarget() {
	target.x = 64 + (Math.random() * (canvas.width - 96));
	target.y = 64 + (Math.random() * (canvas.height - 96));
}

function moveHero() {
	/* Up */
	if (38 in keysDown && hero.y > 0) {
		hero.y -= hero.speed;
	}
	/* Down */
	if (40 in keysDown && hero.y < canvas.height-32) {
		hero.y += hero.speed;
	}
	/* Left */
	if (37 in keysDown && hero.x > 0) {
		hero.x -= hero.speed;
	}
	/* Right */
	if (39 in keysDown && hero.x < canvas.width-32) {
		hero.x += hero.speed;
	}

	/* After scoring, add an obstacle and increment score */
	if (hero.x <= target.x + 30
		&& target.x <= (hero.x + 30)
		&& hero.y <= (target.y + 30)
		&& target.y <= (hero.y + 30))
	{
		score++;
		moveTarget();
		obstacles.push(new Obstacle());
	}
}

/* Moves each of the obstacles one step in their respective directions */
function moveObstacles() {
	/* First, move all the obstacles */
	for (var i = 0; i < obstacles.length; i++) {
		var o = obstacles[i];
		if (!(o.x > 0 && o.x < canvas.width-30)) {
			o.dx *= -1;
		}
		if (!(o.y > 0 && o.y < canvas.height-30)) {
			o.dy *= -1;
		}
		o.x += o.dx;
		o.y += o.dy;
		
		/* If an obstacle intersects the hero, it's game over */
		if (hero.x <= o.x + 30
		&& o.x <= (hero.x + 30)
		&& hero.y <= (o.y + 30)
		&& o.y <= (hero.y + 30))
		{
			keysDown = {}; // Stop moving
			alert("Game Over\nScore: " + score);

			/* Reinit vars */
			obstacles = [];
			score = 0;
			moveTarget();
			hero.x = canvas.width/2;
			hero.y = canvas.height/2;
		}
	}
}

/* What happens every step of the game */
function update() {
	moveHero();
	moveObstacles();
}

/* Actually displays where everything is */
function render() {
	/* Background is black */
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	/* Hero is green */
	ctx.fillStyle = "#00ff00";
	ctx.fillRect(hero.x, hero.y, 32,32);

	/* Target is blue */
	ctx.fillStyle = "#0000ff";
	ctx.fillRect(target.x, target.y, 30, 30);

	/* Obstacles are red */
	ctx.fillStyle = "#ff0000";
	for (var i = 0; i < obstacles.length; i++) {
		var o = obstacles[i];
		ctx.fillRect(o.x,o.y,30,30);
	}

	/* Display the score at the top */
	ctx.fillStyle = "#ffffff";
	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Score: " + score, canvas.width/2,30);
}

/* Main game loop; calls all other functions */
function main() {
	setTimeout(main, 10); // Makes sure main will happen every 10 ms
	
	update();
	render();
	
	/* Makes sure that the update is occurring as it should */
	console.log(new Date().getMilliseconds() - last);
	last = new Date().getMilliseconds();
}

moveTarget(); // Initialize the target
var last = new Date().getMilliseconds();
main(); // Start the main game loop