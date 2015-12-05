import _ from 'lodash'
import Trianglify from 'trianglify'

import socket from 'socket.io-client'

import context, { updateCanvasSize } from './canvas'
import Player from './player'
var player = new Player();

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('keydown', keyDown, false);


updateCanvasSize();

var thisTime = new Date().getTime();
var delta = 0;
var lastTime = thisTime;
var interval = 0;
var targetInterval = 15;

//https://github.com/joebain/uprok/blob/master/scripts/flyrock.js#L1098
function loop() {
  thisTime = new Date().getTime();
	delta = thisTime-lastTime;
	lastTime = thisTime;

	update(delta);
	draw();

	interval = targetInterval - (new Date().getTime() - thisTime);
	interval = interval < 1 ? 1 : interval;
	setTimeout(loop, interval);
}

loop();

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(context);
}

function update(delta) {
  player.update(delta);
}

function keyDown(event) {
  switch(event.keyCode) {
    case 65:
    case 37:
      player.moveLeft();
      break;
    case 68:
    case 39:
      player.moveRight();
      break;
  }
}



function keyUp(event) {
  switch(event.keyCode) {
  case 65:
  case 68:
  case 39:
  case 37:
    player.moveStop();
    break;
  }
}
