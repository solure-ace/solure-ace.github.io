// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// -Project resizes with the Window
// 
let borderSize = 60;


function setup() {
  createCanvas(windowWidth, windowHeight);
  stuff();

}

function draw() {
}

function mousePressed() {
  fill("black");
  circle(mouseX, mouseY, 10);
}

function mouseDragged() {
  fill("black");
  circle(mouseX, mouseY, 10);
}

function smallCanvas() {
  //smaller drawable area
  noStroke();
  fill(230)
  rect(100, 100, 500)
}

function stuff() {
  background(230, 200, 260);
  smallCanvas();
}


//resizes the project with the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stuff();
}