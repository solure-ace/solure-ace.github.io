// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// 
let borderSize = 60;
let rectHeight = 700;
let rectWidth = 500;
let rectX = 100;
let rectY = 100;
let brushSize = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  stuff();

}

function draw() {
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

rect()