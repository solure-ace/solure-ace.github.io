// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// -mouse scroll wheel changes brushSize
// testtt

///formating
let borderSize = 60;
///drawable area 
let rectHeight = 500;
let rectWidth = 600;
let rectX = 100;
let rectY = 100;
///brush
let brushSize = 10;
///color
let brushR = 0;
let brushG = 0;
let brushB = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  stuffToDoWhenStarts();
}

function draw() {
  //currently empty for some reason????
}

function mouseWheel(event) {
  if (event.delta <= 0 && brushSize <= 80 ) {
    brushSize += 5;
  }
  else if (event.delta > 1 && brushSize > 6) {
    brushSize -= 5;
  }
}

function mousePressed() {
  if (mouseX <= rectWidth + rectX && mouseX >= rectX && mouseY <= rectHeight + rectY && mouseY >= rectY) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function mouseDragged() {
  if (mouseX <= rectWidth + rectX && mouseX >= rectX && mouseY <= rectHeight + rectY && mouseY >= rectY) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function smallCanvas() {
  //drawable area
  noStroke();
  fill(230);
  rect(rectX, rectY, rectWidth, rectHeight);
}

function stuffToDoWhenStarts() { 
  background(230, 200, 260); //light purple/pink
  smallCanvas();
  brushSize = 10;
}


//resizes the project with the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stuffToDoWhenStarts();
}

