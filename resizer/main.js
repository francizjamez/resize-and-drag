const border = document.getElementById("border");
const leftDiv = document.getElementById("left-div");

let savedMousePosition = null;

let positionInfo = leftDiv.getBoundingClientRect();
let width = positionInfo.width;

border.addEventListener("mousedown", mouseDownHandler);
border.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler(e) {
  savedMousePosition = [e.clientX, e.clientY];
  border.addEventListener("mousemove", mouseMoveHandler);
}

function mouseMoveHandler(e) {
  const [deltaX, deltaY] = calculateDelta([e.x, e.y]);
  leftDiv.style.width = width + deltaX + "px";
}

function mouseUpHandler(e) {
  border.removeEventListener("mousemove", mouseMoveHandler);
  prevPosition = border.style.left.replace("px", "");
  width = leftDiv.getBoundingClientRect().width;
}

function calculateDelta([currentX, currentY]) {
  const [savedX, savedY] = savedMousePosition;
  return [currentX - savedX, currentY - savedY];
}
