// Translate and rotate demo


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(40);
  rectMode(CENTER);

  push();
  noStroke();
  translate(200, 200);
  rotate(mouseX);
  fill(190, 120, 255);
  rect(0, 0, 100);
  pop();

  fill(80, 175, 110);
  rect(width/2, height-100, width*5, 400);
}
