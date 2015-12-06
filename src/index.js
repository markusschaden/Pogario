import _ from 'lodash'
import Trianglify from 'trianglify'
import socket from 'socket.io-client'
import Pogario_Loadbar from './pogario_logo'
import Manager from './manager'

import context, {
    updateCanvasSize
}
from './canvas'

var logo = new Pogario_Loadbar();

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('keydown', keyDown, false);

updateCanvasSize();

var thisTime = new Date().getTime();
var delta = 0;
var lastTime = thisTime;
var interval = 0;
var targetInterval = 15;

var singleGame = new Manager();
singleGame.startSinglePlayer();
var managers = [];

// TODO: only use if offline or waiting
managers.push(singleGame);

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

    managers.forEach(function (manager, index) {
        manager.draw(context);
    });
}

function update(delta) {
    logo.update(delta);

    managers.forEach(function (manager, index) {
        manager.update(delta);
    });
}

function keyDown(event) {
    switch (event.keyCode) {
    case 65:
    case 37:
        singleGame.players.forEach(function (player, index) {
            player.moveLeft();
        });
        break;
    case 68:
    case 39:
        singleGame.players.forEach(function (player, index) {
            player.moveRight();
        });
        break;
    }
}

function keyUp(event) {
    switch (event.keyCode) {
    case 65:
    case 68:
    case 39:
    case 37:
        singleGame.players.forEach(function (player, index) {
            player.moveStop();
        });
        break;
    }
}