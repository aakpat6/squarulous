/*
 * The main Squarulous runners. Contains code for each of the rooms 
 * and the game loops.
 */

/* Deal with window resize */
window.onresize = function(event) {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

function startScreen() {
   handle = setTimeout(startScreen, 10);
   renderStartScreen();
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
}

gameStatus = START_SCREEN;
startScreen();
