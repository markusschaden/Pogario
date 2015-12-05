import _ from 'lodash'
import Trianglify from 'trianglify'

import context, { updateCanvasSize } from './canvas'

window.addEventListener('resize', updateCanvasSize, false);
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


var currentPos = 30;

function update(delta) {

  currentPos = (currentPos += 1) % 360;


}



function draw() {

  var x = 300;
  var y = 300;

  var size = 60;
  var radius = 70;
  var padLength = 60;


  context.clearRect(0, 0, canvas.width, canvas.height);


  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();




    context.beginPath();
    context.arc(x,y,radius,getRadians(currentPos),getRadians(currentPos+padLength));
    context.lineWidth = 10;
    context.strokeStyle = 'red';
    context.stroke();


}



function getRadians(dgrs) {

  var degrees = ( Math.PI/180 ) * dgrs;
  return degrees;

}
