// Array and Object Notation
// Avery Walker
// October 8th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//enemies
let enemyArray = [];
let amountOfEnemies = 0;

//points
let points = 100;
let pointsSpent = 0;

//state variable for instructions
let readInstructions = false;
//function display points >>> (points-pointsSpent)

let player = {
  currentHP: 100,
  maxHP: 100,
  height: 100,
  width: 40,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //keep
  background(0);
  displayPoints();



  //testing
  healthBarDisplay(width/2, height/2, player);
  if (player.currentHP > 0) {
    player.currentHP -= 1;
  }
  healthBarDisplay(width/2 + 100, height/2 + 100, player);
}

// function increaseEnemies() {
//   // only increase from zero if (readIntructions === true)
//   // increase amount of enemies based on players (total) points

// }

function spawnEnemy() {
  for (let i = 0; i < amountOfEnemies; i++) {
    let randomHP = random(50, 150);

    let someEnemy = {
      maxHP: randomHP, 
      currentHP: randomHP,
      atk: random(50, 100),
      width: 30,
      height: 30,
    };
  }
}

function healthBarDisplay(x, y, guy) {
  //grey bar
  let greyBarWidth = 110;
  let greyX = x + guy.width/2 - greyBarWidth/2;
  let greyY = y + guy.height + 5;

  //coloured bar
  let barX = width/2-greyBarWidth;
  let barY = height/2;

  //percentage health total/current hp global variable
  noStroke();
  fill(100);
  rect(x, y, greyBarWidth, 30);

  //green
  if (guy.currentHP >= guy.maxHP/2){
    fill(80, 230, 120);
  }

  //red
  else if (guy.currentHP <= guy.maxHP/5){
    fill(255, 120, 80);
  }

  //yellow
  else {
    fill(210, 210, 80);
  }

  rect(x+5, y+5, guy.currentHP, 20);
}

function displayPoints() {
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text(`points:${str(points - pointsSpent)}`, 50, 50);
}
