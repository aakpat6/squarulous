/*
 * User interaction is placed here. Any listeners should be in this file,
 * along with their helper functions.
 */

/* Key listeners */
canvas.addEventListener("keydown", function (e) {
   keysDown[e.keyCode] = true;
}, false);

canvas.addEventListener("keyup", function (e) {
   delete keysDown[e.keyCode];
}, false);

canvas.addEventListener('mousedown', function (e) {
   if (gameStatus == START_SCREEN) return;
   if (gameStatus == IN_GAME) return;
   if (gameStatus == GAME_OVER) checkRetryClick(e);
}, false);

function checkRetryClick(e) {
   if (e.x > canvas.width/2-150 && 
       e.x < canvas.width/2+150 && 
       e.y > 350 && e.y < 430) {
      /* Reinit vars */
      obstacles = [];
      score = 0;
      moveTarget();
      hero.x = canvas.width/2;
      hero.y = canvas.height/2;
      clearTimeout(handle);
      main();
   }  
}