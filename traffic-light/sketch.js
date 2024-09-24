// Traffic Light Demo
// Avery Walker
// Sept 24th 2024

let currentColor = "green";
let lastSwitchedTime = 0;
let waitTime = 3000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  changeColor();
  drawOutlineOfLights();
}

function changeColor() {
  //if red switch to green after normal wait time
  if (currentColor === "red")
    if (millis() > lastSwitchedTime + waitTime) {
      currentColor = "green";
      lastSwitchedTime = millis();
    }
  
  //if yellow switch to red after halfed wait time
  if (currentColor === "yellow") {
    if (millis() > lastSwitchedTime + waitTime/2) {
      currentColor = "red";
      lastSwitchedTime = millis();
    }
  }

  //if green switch to yellow after normal wait time
  if (currentColor === "green") {
    if (millis() > lastSwitchedTime + waitTime) {
      currentColor = "yellow";
      lastSwitchedTime = millis();
    }
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //top / red light
  fill(180)
  if (currentColor === "red") {
    fill(currentColor)
  }
  ellipse(width/2, height/2 - 65, 50, 50);

  // middle / yellow light
  fill(180)
  if (currentColor === "yellow") {
    fill(currentColor)
  }
  ellipse(width/2, height/2, 50, 50); //middle

  //bottom / green light
  fill(180)
  if (currentColor === "green") {
    fill(currentColor)
  }
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}