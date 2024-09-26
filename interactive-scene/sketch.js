// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// -mouse scroll wheel changes brushSize

///formating
let borderSize = 100;
///drawable area 
let rectHeight = 500;
let rectWidth = 600;
let rectX = borderSize;
let rectY = borderSize;
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
  if (mouseX <= windowWidth-borderSize*2 + rectX && mouseX >= rectX && mouseY <= windowHeight-borderSize*2 + rectY && mouseY >= rectY) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function mouseDragged() {
  if (mouseX <= windowWidth-borderSize*2 + rectX && mouseX >= rectX && mouseY <= windowHeight-borderSize*2 + rectY && mouseY >= rectY) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function keyPressed() {
  if (key === "r") {
    stuffToDoWhenStarts();
  }
}

function smallCanvas() {
  //drawable area
  noStroke();
  fill(230);
  // if (windowWidth >= borderSize + rectWidth && windowHeight >= borderSize + rectHeight) {
  rect(rectX, rectY, windowWidth-borderSize*2, windowHeight-borderSize*2);
  // } 
  // else if (windowWidth >= borderSize + rectWidth && windowHeight <= borderSize + rectHeight) {
  //   rect(rectX, rectY, rectWidth, windowHeight-borderSize*2);
  // }
  // else if (windowHeight >= borderSize + rectHeight && windowWidth <= borderSize + rectWidth) {
  //   rect(rectX, rectY, rectWidth, windowHeight-borderSize*2);
  // }
}

function colorPallete() {}

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

