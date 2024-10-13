// Array and Object Notation
// Avery Walker
// October 12th 2024
//
// Extra for Experts:
// -object within an object ('player.spriteStates.h')

//enemies
let enemyArray = [];
let amountOfEnemies = 1;

//points
let points = 100;
let pointsSpent = 0;

//state variable for instructions
let readInstructions = false;

//player objects
let player = {
  currentHP: 100,
  maxHP: 100,
  height: 450,
  width: 100,
  atk: 50,
  def: 50,
  x: 0,
  y: 120,

  spriteStates: {
    //head
    h: "default",
    hH: 100,
    hW: 100,
    hX: 0,
    hY: 120,
    // // right arms
    // rA: "default",
    // rAX: 0,
    // rAY: 120,
    // //left arm
    // lA: "default",
    // lAX: 0,
    // lAY: 120,
    //torso
    t: "default",
    tH: 120,
    tW: 100,
    tX: 0,
    tY: 230,
    //legs
    lH: 170,
    lW: 100,
    lX: 0,
    lY: 360,
  },
};

// let spriteStates = {
//   //head
//   h: "default",
//   //arms
//   rA: "default",
//   lA: "default",
//   //torso
//   t: "default",
// };

function setup() {
  createCanvas(windowWidth, windowHeight);
  player.x = width/7;
  player.spriteStates.hX = width/7;
  player.spriteStates.tX = width/7;
  player.spriteStates.lX = width/7;


  //interval for normal speed t+h -> default || rA -> hit
  //interval for faster speed lA -> default || t+h -> low
  //interval for fastest speed lA -> hit
  //interval for slowest speed rA -> default
}

function animatePlayer(speed) {
  speed = "normal"
  if (speed === "normal") {

  }
}

function draw() {
  ///////keep
  background(0);
  displayPoints();

  ///////testing 

  healthBarDisplay(player.x, player.y, player);
  // if (player.currentHP > 0) {
  //   player.currentHP -= 1;
  // }

  fill(20);
  rect(width/2-200, 100, width/2, height-200);

  displayPlayer();
}

// function increaseEnemies() {
//   // only increase from zero if (readIntructions === true)
//   // increase amount of enemies based on players (total) points

// }

function spawnEnemy(enemyX, enemyY) {
  for (let i = 0; i < amountOfEnemies; i++) {
    let randomHP = random(50, 150);

    let someEnemy = {
      maxHP: randomHP, 
      currentHP: randomHP,
      atk: random(50, 100),
      width: 30,
      height: 30,
      x: enemyX,
      y: enemyY,
    };
    enemyArray.push(someEnemy);
  }
}

function changeSpriteStates() {
  if (player.currentHP < player.maxHP/2) {
    player.spriteStates.h = "low";
  }
  else if (player.currentHP >= player.maxHP/2) {
    player.spriteStates.h = "default";
    player.spriteStates.t = "default";
    player.spriteStates.rA = "default";
    player.spriteStates.lA = "default";
  }
  if (tookDamage(player)) {
    player.spriteStates.h = "hit";
    player.spriteStates.t = "hit";
    player.spriteStates.rA = "hit";
    player.spriteStates.lA = "hit";
    for(let i = 0; i < 300; i++) {
      player.spriteStates.h = "default";
      player.spriteStates.t = "default";
      player.spriteStates.rA = "default";
      player.spriteStates.lA = "default";
    }
  }
}

function displayPlayer() {

  player.spriteStates.h = "low";
  if (player.spriteStates.h === "low") {
    fill("yellow");
  }
  else { // if (spriteStates.h === "default" && spriteStates.t === "default")
    fill("green");
  }

  //placeholder h
  fill("blue")
  rect(player.spriteStates.hX, player.spriteStates.hY, player.spriteStates.hW, player.spriteStates.hH);
  //placeholder t
  fill("purple")
  rect(player.spriteStates.tX, player.spriteStates.tY, player.spriteStates.tW, player.spriteStates.tH);
  //placeholder l
  fill("green")
  rect(player.spriteStates.lX, player.spriteStates.lY, player.spriteStates.lW, player.spriteStates.lH);

}

function tookDamage(guy, attacker) {
  guy.currentHP -= attacker.atk - (attacker.atk/guy.def);
}

function healthBarDisplay(x, y, guy) {
  //grey bar
  let greyBarWidth = 110;
  let greyX = x + guy.width/2 - greyBarWidth/2;
  let greyY = y + guy.height;

  noStroke();
  fill(100);
  rect(greyX, greyY, greyBarWidth, 30);

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

  rect(greyX+5, greyY+5, guy.currentHP, 20);
}

function displayPoints() {
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text(`points:${str(points - pointsSpent)}`, 50, 50);
}