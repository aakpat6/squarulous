/*
 * Functionality of the game.
 * This is where all the physics and game mechanics are.
 */

/* What happens every step of the game */
function update() {
   moveHero();
   moveObstacles();
}

/* Moves the target to a random location on the canvas */
function moveTarget() {
   target.x = 2*TARGET_SIZE + (Math.random() * (canvas.width- 3*TARGET_SIZE));
   target.y = 2*TARGET_SIZE + (Math.random() * (canvas.height- 3*TARGET_SIZE));
}

function moveHero() {
   /* Up */
   if (38 in keysDown && hero.y > 0) {
      hero.y -= hero.speed;
   }
   /* Down */
   if (40 in keysDown && hero.y < canvas.height-HERO_SIZE-10) {
      hero.y += hero.speed;
   }
   /* Left */
   if (37 in keysDown && hero.x > 0) {
      hero.x -= hero.speed;
   }
   /* Right */
   if (39 in keysDown && hero.x < canvas.width-HERO_SIZE-10) {
      hero.x += hero.speed;
   }

   /* After scoring, add an obstacle and increment score */
   if (hero.x <= target.x + TARGET_SIZE
      && target.x <= (hero.x + HERO_SIZE)
      && hero.y <= (target.y + TARGET_SIZE)
      && target.y <= (hero.y + HERO_SIZE))
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
      if (!(o.x > 0 && o.x < canvas.width-OBSTACLE_SIZE)) {
         o.dx *= -1;
      }
      if (!(o.y > 0 && o.y < canvas.height-OBSTACLE_SIZE)) {
         o.dy *= -1;
      }
      o.x += o.dx;
      o.y += o.dy;
      
      /*If an obstacle intersects an obstacle, collide the obstacles*/
      for(var j=i+1;j<obstacles.length;j++) {
            var THRESHOLD = 1;
            var other = obstacles[j];
            if(other.x <= o.x + OBSTACLE_SIZE
               && o.x <= (other.x + OBSTACLE_SIZE)
               && other.y <= (o.y + OBSTACLE_SIZE)
               && o.y <= (other.y + OBSTACLE_SIZE))
            {
               //Right to left collision
               if(Math.abs(other.x + OBSTACLE_SIZE - o.x) <= THRESHOLD) {
                  var temp = o.dx;
                  o.dx = other.dx;
                  other.dx - temp;
               }
               //Bottom to top collision
               if(Math.abs(other.y + OBSTACLE_SIZE - o.y) <= THRESHOLD) {
                  var temp = o.dy;
                  o.dy = other.dy;
                  other.dy = temp;
               }
               //Top to bottom collision
               if(Math.abs(other.y - (o.y + OBSTACLE_SIZE)) <= THRESHOLD) {
                  var temp = o.dy;
                  o.dy = other.dy;
                  other.dy = temp;
               }
               //Left to right collision
               if(Math.abs(other.x - (o.x + OBSTACLE_SIZE)) <= THRESHOLD) {
                  var temp = o.dx;
                  o.dx = other.dx;
                  other.dx - temp;
               }
            }
      }

      /* If an obstacle intersects the hero, it's game over */
      if (hero.x <= o.x + OBSTACLE_SIZE
      && o.x <= (hero.x + HERO_SIZE)
      && hero.y <= (o.y + OBSTACLE_SIZE)
      && o.y <= (hero.y + HERO_SIZE))
      {
         keysDown = {}; // Stop moving
                  
         clearTimeout(handle);
         gameOver();
      }
   }
}