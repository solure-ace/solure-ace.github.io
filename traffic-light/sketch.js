// Traffic Light Demo
// Avery Walker
// Sept 24th 2024


let currentColor = "green";
let lastSwitchedTime = 0;
let waitTime = 3000;
// contstant variable example: const WAIT_TIME = 3000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  changeColor();
  drawOutlineOfLights();
}

function changeColor() {
  //if red switch to green after wait time
  if (currentColor === "red" && millis() > lastSwitchedTime + waitTime) {
    currentColor = "green";
    lastSwitchedTime = millis();
    console.log(currentColor);
  }
  
  //if yellow switch to red after halfed wait time
  if (currentColor === "yellow" && millis() > lastSwitchedTime + waitTime/2 ) {
    currentColor = "red";
    lastSwitchedTime = millis(); 
    console.log(currentColor); 
  }

  //if green switch to yellow after wait time
  if (currentColor === "green" && millis() > lastSwitchedTime + waitTime) {
    currentColor = "yellow";
    lastSwitchedTime = millis();
    console.log(currentColor);
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //top / red light
  fill(180);
  if (currentColor === "red") {
    fill(currentColor);
  } ellipse(width/2, height/2 - 65, 50, 50);

  // middle / yellow light
  fill(180);
  if (currentColor === "yellow") {
    fill(currentColor);
  } ellipse(width/2, height/2, 50, 50); //middle

  //bottom / green light
  fill(180);
  if (currentColor === "green") {
    fill(currentColor);
  } ellipse(width/2, height/2 + 65, 50, 50); //bottom
}