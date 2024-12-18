// fractal Circle demo
// using recursion
// Avery Walker


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(60);

  recursiveCircle(width/2, height/2, mouseX+30);
}

function recursiveCircle(x, y, radius) {
  circle(x, y, radius*2);

  if (radius > 30) {
    recursiveCircle(x-radius/2, y, radius/2);
    recursiveCircle(x+radius/2, y, radius/2);
  }
  //recursiveCircle(x+radius/2, y+radius/2, radius/2);
}