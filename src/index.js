import _ from 'lodash'
import Trianglify from 'trianglify'
import SAT from 'sat'
import Victor from 'victor'

import context, {
    updateCanvasSize
}
from './canvas'
import Map from './map'
import Player from './player'
import Ball from './ball'

var map = new Map();
var player = new Player();
var ball = new Ball();

window.addEventListener('resize', updateCanvasSize, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('keydown', keyDown, false);

updateCanvasSize();

// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

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

    map.draw(context);
    ball.draw(context);
    player.draw(context);
}

function update(delta) {
    player.update(delta);
    ball.update(delta);
    collision();
}

function collision() {
    var polygon = new SAT.Box(new SAT.Vector(map.x, map.y), map.width, map.height).toPolygon();
    var circle = new SAT.Circle(new SAT.Vector(ball.x, ball.y), ball.radius);
    var response = new SAT.Response();
    changeDirection();

    var circlePlayer = new SAT.Circle(new SAT.Vector(player.x, player.y), player.radius);
    if (SAT.testCircleCircle(circle, circlePlayer, response)) {
        var angleBall = new Victor(ball.x - player.x, ball.y - player.y).angleDeg();
        angleBall = (angleBall < 0) ? 360 + angleBall : angleBall;

        if (Math.abs(angleBall - player.currentPadPos) < player.padLength / 2) {
            ball.direction.invert();
            //player.radius += 5;
        }
    }
}

function changeDirection() {
    if ((ball.direction.x > 0) && (ball.x + ball.radius > map.width + map.x)) {
        ball.x = map.width + map.x - ball.radius;
        ball.direction.invertX();
    } else if ((ball.direction.x < 0) && (ball.x - ball.radius < map.x)) {
        ball.x = map.x + ball.radius;
        ball.direction.invertX();
    }

    if ((ball.direction.y > 0) && (ball.y + ball.radius > map.height + map.y)) {
        ball.y = map.height + map.y - ball.radius;
        ball.direction.invertY();
    } else if ((ball.direction.y < 0) && (ball.y - ball.radius < map.y)) {
        ball.y = map.y + ball.radius;
        ball.direction.invertY();
    }
}

function keyDown(event) {
    switch (event.keyCode) {
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
    switch (event.keyCode) {
    case 65:
    case 68:
    case 39:
    case 37:
        player.moveStop();
        break;
    }
}