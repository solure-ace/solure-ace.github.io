// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// -mouse scroll wheel changes brushSize

///formating
let borderSize = 100;
let paletteWidth;
//color palette
let colorOrder = "red";
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

function changeColor() {
  if (colorOrder === "red") {
    colorOrder = "green";
  }
  else if (colorOrder === "green"){
    colorOrder = "blue";
  }
  else if (colorOrder === "blue") {
    colorOrder = "white";
  }
  else if (colorOrder === "white") {
    colorOrder = "black";
  }
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
  if (mouseX <= windowWidth-borderSize*2 + borderSize && mouseX >= borderSize && mouseY <= windowHeight-borderSize*2 + borderSize && mouseY >= borderSize) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function doubleClicked(){
  // red
  if (mouseX >= borderSize && mouseX <= borderSize + paletteWidth && mouseY >= windowHeight-borderSize && mouseY <= windowHeight) {
    brushR = 255;
    brushG = 50;
    brushB = 50;
  }
  //green
  else if (mouseX >= borderSize + paletteWidth && mouseX <= borderSize + paletteWidth*2 && mouseY >= windowHeight-borderSize && mouseY <= windowHeight) {
    brushR = 40;
    brushG = 170;
    brushB = 40;
  }
  //blue
  else if (mouseX >= borderSize + paletteWidth*2 && mouseX <= borderSize + paletteWidth*3 && mouseY >= windowHeight-borderSize && mouseY <= windowHeight) {
    brushR = 50;
    brushG = 50;
    brushB = 255;
  }
  //white
  else if (mouseX >= borderSize + paletteWidth*3 && mouseX <= borderSize + paletteWidth*4 && mouseY >= windowHeight-borderSize && mouseY <= windowHeight) {
    brushR = 255;
    brushG = 255;
    brushB = 255;
  }
  //black
  else if (mouseX >= borderSize + paletteWidth*4 && mouseX <= borderSize + paletteWidth*5 && mouseY >= windowHeight-borderSize && mouseY <= windowHeight) {
    brushR = 0;
    brushG = 0;
    brushB = 0;
  }
}

function mouseDragged() {
  if (mouseX <= windowWidth-borderSize*2 + borderSize && mouseX >= borderSize && mouseY <= windowHeight-borderSize*2 + borderSize && mouseY >= borderSize) {
    fill(brushR, brushG, brushB);
    circle(mouseX, mouseY, brushSize);
  }
}

function keyPressed() {
  // reset canvas when 'r' pressed
  if (key === "r") {
    stuffToDoWhenStarts();
  }
}

function smallCanvas() {
  //drawable area
  noStroke();
  fill(230);
  rect(borderSize, borderSize, windowWidth-borderSize*2, windowHeight-borderSize*2);
}

function colorPalette() {
  //red, green, blue, white, + black
  colorOrder = "red";
  let colorFifths = 0;
  for (let i=0; i < 5; i++) {
    fill(colorOrder);
    rect(borderSize + colorFifths, windowHeight-borderSize, (windowWidth-borderSize*2)/5);
    colorFifths += (windowWidth-borderSize*2)/5;
    changeColor();
  }
}

function stuffToDoWhenStarts() { 
  background(100);
  smallCanvas();
  colorPalette();
  paletteWidth = (windowWidth-borderSize*2)/5;
  brushSize = 10;
}

//resizes the project with the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stuffToDoWhenStarts();
}