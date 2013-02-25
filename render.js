/*
 * This file is used when rendering any of the rooms.
 */

function renderStartScreen() {
   ctx.fillStyle = "#000000";
   ctx.fillRect(0,0,canvas.width,canvas.height);
   
   ctx.fillStyle = "#ffffff";
   ctx.font = "72px Arial";
   ctx.textAlign = "center";
   ctx.fillText("Squarulous!", canvas.width/2, 275);
   
   ctx.fillStyle = "#007700";
   ctx.fillRect(canvas.width/2-150, 350, 300, 80); 
   ctx.fillStyle = "#ffffff";
   ctx.font = "30px Arial";
   ctx.fillText("Start", canvas.width/2, 400);
}

function renderGameOver() {
   ctx.fillStyle = "#000000";
   ctx.fillRect(0,0,canvas.width,canvas.height);
   
   ctx.fillStyle = "#ffffff";
   ctx.font = "54px Arial";
   ctx.textAlign = "center";
   ctx.fillText("GAME OVER!", canvas.width/2, 150);
   ctx.fillText("Score: " + score, canvas.width/2, 275);
   
   ctx.fillStyle = "#007700";
   ctx.fillRect(canvas.width/2-150, 350, 300, 80); 
   ctx.fillStyle = "#ffffff";
   ctx.font = "30px Arial";
   ctx.fillText("Retry?", canvas.width/2, 400);
}

/* Actually displays where everything is */
function render() {
   /* Background is black */
   ctx.fillStyle = "#000000";
   ctx.fillRect(0,0,canvas.width,canvas.height);

   /* Hero is green */
   ctx.fillStyle = "#00ff00";
   ctx.fillRect(hero.x, hero.y, HERO_SIZE,HERO_SIZE);

   /* Target is blue */
   ctx.fillStyle = "#0000ff";
   ctx.fillRect(target.x, target.y, TARGET_SIZE, TARGET_SIZE);

   /* Obstacles are red */
   ctx.fillStyle = "#ff0000";
   for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      ctx.fillRect(o.x,o.y,OBSTACLE_SIZE,OBSTACLE_SIZE);
   }

   /* Display the score at the top */
   ctx.fillStyle = "#ffffff";
   ctx.font = "30px Arial";
   ctx.textAlign = "center";
   ctx.fillText("Score: " + score, canvas.width/2,30);
}

