/* Initialize variables */
var HERO_SIZE = 32;
var TARGET_SIZE = 30;
var OBSTACLE_SIZE = 30;
var THRESHOLD = 5;
/*
 * Place any and all global variables that you want to use in this file.
 * Variables in this will be able to be accessed by any of the other files.
 */

/* Initialize HTML elements */
var canvas = document.getElementById("myCanvas");
canvas.setAttribute('tabindex', '0');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.focus();
var ctx = canvas.getContext("2d");

var START_SCREEN = 0;
var IN_GAME = 1;
var GAME_OVER = 2;

var obstacles = []; // Obstacles list
var score = 0;
var keysDown = {}; // Dictionary of which keys are pressed at a given time.
var handle = null; // The timeout handle
var gameStatus = START_SCREEN;

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
   var speedfactor = 4;
   this.x = OBSTACLE_SIZE-(2*THRESHOLD) + (Math.random() * (canvas.width-2*OBSTACLE_SIZE));
   this.y = OBSTACLE_SIZE-(2*THRESHOLD) + (Math.random() * (canvas.height-2*OBSTACLE_SIZE));
   this.dx = Math.floor(Math.random() * speedfactor) + 1;
   this.dy = Math.floor(Math.random() * speedfactor) + 1;
   
   /* Start the obstacle on the top or the right? */
   var randStart = Math.floor(Math.random() * 2);
   if (randStart == 0) this.y = 20;
   else this.x = 20;
}
