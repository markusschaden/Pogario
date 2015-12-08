let canvasWrapper = document.getElementById("canvasWrapper");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

export function updateCanvasSize() {
  canvas.width = canvasWrapper.clientWidth;
  canvas.height = canvasWrapper.clientHeight;
}

export default context
