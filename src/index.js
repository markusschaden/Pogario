import _ from 'lodash'
import Trianglify from 'trianglify'

//import Player from './player'

let canvasWrapper = document.getElementById("canvasWrapper");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = canvasWrapper.clientWidth;
  canvas.height = canvasWrapper.clientHeight;
}
resizeCanvas();


var thisTime = new Date().getTime();
var delta = 0;
var lastTime = thisTime;
var interval = 0;
var targetInterval = 30;

//https://github.com/joebain/uprok/blob/master/scripts/flyrock.js#L1098
function loop() {
  thisTime = new Date().getTime();
	delta = thisTime-lastTime;
	lastTime = thisTime;

	//update(delta);
	draw();

	interval = targetInterval - (new Date().getTime() - thisTime);
	interval = interval < 1 ? 1 : interval;
	setTimeout(loop, interval);
}

loop();


function draw() {

  ctx.beginPath();
  ctx.arc(300,300,40,getRadians(30),getRadians(90));
  ctx.lineWidth = 15;
}



function getRadians(dgrs) {

  var degrees = ( Math.PI/180 ) * dgrs;
  return degrees;

}
