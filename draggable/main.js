const box = document.getElementById("box");
const container = document.getElementById("container");

let savedMousePosition = null;
let boxPosition = [0, 0];

let savedX = 0;
let savedY = 0;

const leftBorder = container.offsetLeft;
const rightBorder = leftBorder + 384 - 96;

const topBorder = container.offsetTop;
const bottomBorder = topBorder + 384 - 96;

box.addEventListener("mousedown", mouseDownHandler);
box.addEventListener("mouseup", mouseUpHandler);

function mouseDownHandler(e) {
  savedMousePosition = [e.clientX, e.clientY];
  box.addEventListener("mousemove", mouseMoveHandler);
}

function mouseMoveHandler(e) {
  let [deltaX, deltaY] = calculateDelta([e.clientX, e.clientY]);

  if (deltaX < 0) {
    if (e.target.offsetLeft > leftBorder) {
      box.style.left = boxPosition[0] + deltaX + "px";
      savedX = boxPosition[0] + deltaX;
    } else {
      savedMousePosition = [e.clientX, e.clientY];
      deltaY = 0;
      boxPosition = [savedX, savedY];
    }
  } else if (deltaX > 0) {
    if (e.target.offsetLeft < rightBorder) {
      box.style.left = boxPosition[0] + deltaX + "px";
      savedX = boxPosition[0] + deltaX;
    } else {
      savedMousePosition = [e.clientX, e.clientY];
      deltaY = 0;
      boxPosition = [savedX, savedY];
    }
  }

  if (deltaY < 0) {
    if (e.target.offsetTop > topBorder) {
      box.style.top = boxPosition[1] + deltaY + "px";
      savedY = boxPosition[1] + deltaY;
    } else {
      savedMousePosition = [e.clientX, e.clientY];
      boxPosition = [savedX, savedY];
    }
  } else if (deltaY > 0) {
    if (e.target.offsetTop < bottomBorder) {
      box.style.top = boxPosition[1] + deltaY + "px";

      savedY = boxPosition[1] + deltaY;
    } else {
      savedMousePosition = [e.clientX, e.clientY];
      boxPosition = [savedX, savedY];
    }
  }
}

function mouseUpHandler(e) {
  box.removeEventListener("mousemove", mouseMoveHandler);
  savedMousePosition = [0, 0];
  boxPosition[0] = savedX;
  boxPosition[1] = savedY;
}

function calculateDelta([currentX, currentY]) {
  const [savedX, savedY] = savedMousePosition;
  return [currentX - savedX, currentY - savedY];
}
