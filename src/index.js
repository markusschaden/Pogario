import _ from 'lodash'
import Trianglify from 'trianglify'

import io from 'socket.io-client'
import Pogario_Loadbar from './pogario_logo'

import context, { updateCanvasSize } from './canvas'

import Manager from './manager'

var logo = new Pogario_Loadbar();
var manager = new Manager();

var player1 = manager.newPlayer();
var player2 = manager.newPlayer();
player2.x = 600;

var ball = manager.newBall();

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('keydown', keyDown, false);

let socket = io()

socket.on('time sync', function (time) {
  let myTime = new Date().getTime()
  console.log(`got a time sync from server, it's ${time}. Mine is ${myTime}!`);
});

socket.on('update paddles', function (position) {
  player2.set(position)
})

let me = Math.ceil(Math.random() * 10)

socket.emit('start', me)

socket.on('move right', function (player) {
  console.log(`I'm ${me}!`)
  console.log(`player ${player.name} moved right!`)

  if (player.name != me) {
    console.log('I like to move it move it!')
    player2.moveRight()
  }
})

socket.on('move left', function (player) {
  if (player.name !== me) {
    player2.moveLeft()
  }
})

socket.on('move stop', function (player) {
  if (player.name !== me) {
    player2.moveStop()
  }
})

socket.on('player started', function (player) {
  console.log(`player ${player.name} started game!`)
})

socket.on('ball changed', function (ball_server)  {
  ball.direction.x = ball_server.direction.x;
  ball.direction.y = ball_server.direction.y;
  ball.radius = ball_server.radius;
  ball.x = ball_server.x;
  ball.y = ball_server.y;
})

player1.on('move right', () => socket.emit('move right'))
player1.on('move left', () => socket.emit('move left'))
player1.on('move stop', () => socket.emit('move stop'))





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
    delta = thisTime - lastTime;
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

    logo.draw(context);
    manager.draw(context);
}

function update(delta) {
    logo.update(delta);
    manager.update(delta);
}

function keyDown(event) {
    switch (event.keyCode) {
    case 65:
    case 37:
      player1.moveLeft();
      player1.emit('move left');
      break;
    case 68:
    case 39:
      player1.moveRight();
      player1.emit('move right');
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
    player1.emit('move stop');
    break;
  }
}
