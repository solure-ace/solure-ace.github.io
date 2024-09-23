// Image Demo
// Avery Walker
// sept 23rd, 2024
//
// Extra for Experts:
// - the sponge is bob
let spongebob;

function preload() {
  spongebob = loadImage("spongebob.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  image(spongebob, mouseX-spongebob.width/2, mouseY-spongebob.height/2, 
    spongebob.width, spongebob.height)
}
