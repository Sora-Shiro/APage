function drawLine() {
  var canvas = document.getElementById("learn-draw-canvas");
  var cxt = canvas.getContext("2d");
  cxt.fillStyle="#ff0000";
  cxt.fillRect(0, 0, 150, 75);
}

function clearCanvas() {
  var canvas = document.getElementById("learn-draw-canvas");
  var width = canvas.width;
  var height = canvas.height;
  var cxt = canvas.getContext("2d");
  cxt.fillStyle="#ffffff";
  cxt.fillRect(0, 0, width, height);
}