import _ from 'lodash'
import Trianglify from 'trianglify'

import io from 'socket.io-client'

import context, { updateCanvasSize } from './canvas'
import Player from './player'
var player1 = new Player();
var player2 = new Player();
player2.x = 600;

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('keydown', keyDown, false);

let socket = io()

socket.on('time sync', function (time) {
  let myTime = new Date().getTime()
  console.log(`got a time sync from server, it's ${time}. Mine is ${myTime}!`);
});

let time = new Date().getTime()

console.log(`sending ${time}`)
socket.emit('time sync', time)

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
  player1.draw(context);
  player2.draw(context);
}

function update(delta) {
  player1.update(delta);
  player2.update(delta);
}

function keyDown(event) {
  switch(event.keyCode) {
    case 65:
    case 37:
      player1.moveLeft();
      break;
    case 68:
    case 39:
      player1.moveRight();
      break;
  }
}



function keyUp(event) {
  switch(event.keyCode) {
  case 65:
  case 68:
  case 39:
  case 37:
    player1.moveStop();
    break;
  }
}
