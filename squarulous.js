/*
 * The main Squarulous runners. Contains code for each of the rooms 
 * and the game loops.
 */

/* Deal with window resize */
window.onresize = function(event) {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

function gameOver() {
   handle = setTimeout(gameOver, 10);
   gameStatus = GAME_OVER;   
   renderGameOver();
}

/* Main game loop; calls all other functions */
function main() {
   handle = setTimeout(main, 10); // Makes sure main will happen every 10 ms
   
   update();
   render();
   
   /* Makes sure that the update is occurring as it should */
   console.log(new Date().getMilliseconds() - last);
   last = new Date().getMilliseconds();
}

moveTarget(); // Initialize the target
var last = new Date().getMilliseconds();
main(); // Start the main game loop
