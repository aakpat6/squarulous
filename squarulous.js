var canvas = document.getElementById("myCanvas");
canvas.setAttribute('tabindex', '0');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.focus();
var ctx = canvas.getContext("2d");


var hero = {
	speed: 5,
	x: canvas.width/2,
	y: canvas.height/2,
};

var target = {
	x: 0,
	y: 0
};

var obstacles = [];
var score = 0;
var keysDown = {};

canvas.addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false)

canvas.addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false)

function moveTarget() {
	target.x = 64 + (Math.random() * (canvas.width - 96));
	target.y = 64 + (Math.random() * (canvas.height - 96));
}

function moveHero() {
	if (38 in keysDown && hero.y > 0) {
		hero.y -= hero.speed;
	}
	if (40 in keysDown && hero.y < canvas.height-32) {
		hero.y += hero.speed;
	}
	if (37 in keysDown && hero.x > 0) {
		hero.x -= hero.speed;
	}
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

		var upDown = Math.floor(Math.random() * 2);
		var tmpdy = Math.random() * 5;
		var tmpdx = Math.random() * 5;
		
		var newObstacle = {
			x: 32 + (Math.random() * (canvas.width - 64)),
			y: 32 + (Math.random() * (canvas.height - 64)),
			dx: tmpdx,
			dy: tmpdy,
		};
		if (upDown == 0) newObstacle.y = 5;
		else newObstacle.x = 5;
		obstacles.push(newObstacle);
	}
}

function moveObstacles() {
	for (var i = 0; i < obstacles.length; i++) {
		o = obstacles[i];
		if (!(o.x > 0 && o.x < canvas.width-30)) {
			o.dx *= -1;
		}
		if (!(o.y > 0 && o.y < canvas.height-30)) {
			o.dy *= -1;
		}
		o.x += o.dx;
		o.y += o.dy;

		if (hero.x <= o.x + 30
		&& o.x <= (hero.x + 30)
		&& hero.y <= (o.y + 30)
		&& o.y <= (hero.y + 30))
		{
			keysDown = {};
			
			/*ctx.fillStyle = "#000000";
			ctx.fillRect(0,0,canvas.width,canvas.height);

			ctx.fillStyle = "#ffffff";
			ctx.font = "60px Arial";
			ctx.textAlign = "center";
			ctx.fillText("Game Over", canvas.width/2, 100);
			ctx.fillText("Score: " + score, canvas.width/2, 200);
			ctx.drawText*/

			alert("Game Over\nScore: " + score);

			obstacles = [];
			score = 0;
			movetarget();
			hero.x = canvas.width/2;
			hero.y = canvas.height/2;
		}
	}
}

function update() {
	moveHero();
	moveObstacles();
}

function render() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = "#00ff00";
	ctx.fillRect(hero.x, hero.y, 32,32);

	ctx.fillStyle = "#0000ff";
	ctx.fillRect(target.x, target.y, 30, 30);

	ctx.fillStyle = "#ff0000";
	for (var i = 0; i < obstacles.length; i++) {
		o = obstacles[i];
		ctx.fillRect(o.x,o.y,30,30);
	}

	ctx.fillStyle = "#ffffff";
	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Score: " + score, canvas.width/2,30);
}


function main() {
	setTimeout(main, 10);
	update();
	render();
	console.log(new Date().getMilliseconds() - last);
	last = new Date().getMilliseconds();
}

moveTarget();
var last = new Date().getMilliseconds();
main();