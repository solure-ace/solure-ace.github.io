// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// 
let borderSize = 60;
let rectHeight = 500;
let rectWidth = 600;
let rectX = 100;
let rectY = 100;
let brushSize = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  stuff();

}

function draw() {
}

function mouseWheel(event) {
  if (event.delta > 0) {
    if (brushSize <= 100) {
      brushSize += 5;
    }
  }
  else if (event.delta <= 1) {
    if (brushsize > 6) {
      brushSize -= 5;
    }
  }
}


function mousePressed() {
  if (mouseX <= rectWidth + rectX && mouseX >= rectX && mouseY <= rectHeight + rectY && mouseY >= rectY) {
    fill("black");
    circle(mouseX, mouseY, brushSize);
  }
}

function mouseDragged() {
  if (mouseX <= rectWidth + rectX && mouseX >= rectX && mouseY <= rectHeight + rectY && mouseY >= rectY) {
    fill("black");
    circle(mouseX, mouseY, brushSize);
  }
}

function smallCanvas() {
  //smaller drawable area
  noStroke();
  fill(230)
  rect(rectX, rectY, rectWidth, rectHeight)
}

function stuff() { //call this something better PLS
  background(230, 200, 260); //light purple/pink
  smallCanvas();
}


//resizes the project with the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stuff();
}

