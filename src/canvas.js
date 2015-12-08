let canvasWrapper = document.getElementById("canvasWrapper");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

export function updateCanvasSize() {
  canvas.width = 0;//canvasWrapper.clientWidth;
  canvas.height = 0;//canvasWrapper.clientHeight;
}

export default context
