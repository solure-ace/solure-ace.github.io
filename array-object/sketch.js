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
let points = 0;
let pointsSpent = 0;

//state variable for instructions
let readInstructions = false;
//function display points >>> (points-pointsSpent)

let playerHealth = {
  currentHP: 100,
  maxHP: 100,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  healthBarDisplay(playerHealth);
  if (playerHealth.currentHP > 0) {
    playerHealth.currentHP -= 1;
  }
}

// function increaseEnemies() {
//   // only increase from zero if (readIntructions === true)
//   // increase amount of enemies based on players (total) points

// }

function spawnEnemy() {
  for (let i = 0; i < amountOfEnemies; i++) {
    //object notation
    let someEnemy = {
      maxHP: random(50, 150), 
      currentHP: maxHP,
      atk: random(50, 100),
    };
  }
}

function healthBarDisplay(health) {
  let greyBarWidth = 110;

  let x = width/2-greyBarWidth;
  let y = height/2;
  //percentage health total/current hp global variable
  noStroke();
  fill(100);
  rect(x, y, greyBarWidth, 30);
  fill(80, 230, 120);
  rect(x+5, y+5, health.currentHP, 20);
}
