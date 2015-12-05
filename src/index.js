import _ from 'lodash'
import Trianglify from 'trianglify'

import canvas, { updateCanvasSize } from './canvas'

window.addEventListener('resize', updateCanvasSize, false);

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
	//draw();

	interval = targetInterval - (new Date().getTime() - thisTime);
	interval = interval < 1 ? 1 : interval;
	setTimeout(loop, interval);
}

loop();

updateCanvasSize()
