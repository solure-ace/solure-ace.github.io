// Array and Object Notation
// Avery Walker
// October 12th 2024
//
// Extra for Experts:
// -object within an object ('player.spriteStates.h')

//enemies
let enemyArray = [];
let amountOfEnemies = 3;

//turn order...
//is players turn:
//true> buttons clickable + some visual indication??
//false> turn order iterates through enemy array:
//for (let enemy of enemyArray) {
//
//}

//enemy spawn area

let enemySpawnWidth = 800;
let enemySpawnX = 600;

//points
let points = 100;
let pointsSpent = 0;

//game states  // "start" // "ongoing" // "over"
let gameState = "ongoing";

//
isPlayersTurn = true;

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  //player variables
  player.x = width/7;
  player.spriteStates.hX = width/7;
  player.spriteStates.tX = width/7;
  player.spriteStates.lX = width/7;
  //enemy control
  for (let i = 0; i < amountOfEnemies; i++) {
    spawnEnemy();
  }

  //interval for normal speed t+h -> default || rA -> hit
  //interval for faster speed lA -> default || t+h -> low
  //interval for fastest speed lA -> hit
  //interval for slowest speed rA -> default
}





function draw() {
  ///////keep
  isGameOver();

  // if (gameState = "ongoing") {}
  background(0);
  displayPoints();

  turnOrder();

  ///////testing 
  healthBarDisplay(player);
  // if (player.currentHP > 0) {
  //   player.currentHP -= 1;
  // }

  fill(20);

  //spawn area for enemies
  rect(enemySpawnX, 100, enemySpawnWidth, height-200);

  displayEnemy();
  displayPlayer();


  // background(0);
  // displayPoints();

  // ///////testing 
  // healthBarDisplay(player);
  // // if (player.currentHP > 0) {
  // //   player.currentHP -= 1;
  // // }

  // fill(20);
  // //spawn area for enemies
  // rect(enemySpawnX, 100, enemySpawnWidth, height-200);
  // displayEnemy();
  // displayPlayer();
}





// function increaseEnemies() {
//   // only increase from zero if (readIntructions === true)
//   // increase amount of enemies based on players (total) points
// }







function spawnEnemy() {
  let randomHP = random(50, 150);
  let someEnemy = {
    maxHP: randomHP, 
    currentHP: randomHP,
    atk: 5,//random(5, 15),
    width: 80,
    height: 80,
    x: random(enemySpawnX + 80, enemySpawnX + enemySpawnWidth-80),
    y: random(120, height-220),
    isSelected: false,
  };
  enemyArray.push(someEnemy);

}


function chooseEnemy() {
  // click on enemy during player turn the enemy.isSelected = true
}

function turnOrder() {
  if (isPlayersTurn) {
    //things that happen on the players turn...
  }
  else if (!isPlayersTurn) {
    for (let enemy of enemyArray) {
      enemy.isSelected = true;
      causedDamage(player, enemy.atk);
      enemy.isSelected = false;
    }
  }
  isPlayersTurn = true;
}


function displayEnemy() {
  for (let enemy of enemyArray) {
    // killEnemy();
    fill(200);
    if (enemy.isSelected) {
      stroke(260);
      strokeWeight(3);
    }
    rect(enemy.x, enemy.y, enemy.width, enemy.height);
    healthBarDisplay(enemy);
    noStroke();
  }
}

//not yet working
// function killEnemy() {
//   for (let enemy of enemyArray) {
//     enemy.currentHP -=1;
//     if (enemy.currentHP <= 0) {
//       enemyArray.splice(indexOf[someEnemy], 1);
//     }
//   }
// }

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
  fill("blue");
  rect(player.spriteStates.hX, player.spriteStates.hY, player.spriteStates.hW, player.spriteStates.hH);
  //placeholder t
  fill("purple");
  rect(player.spriteStates.tX, player.spriteStates.tY, player.spriteStates.tW, player.spriteStates.tH);
  //placeholder l
  fill("green");
  rect(player.spriteStates.lX, player.spriteStates.lY, player.spriteStates.lW, player.spriteStates.lH);

}

//temporary function
function mouseClicked() {
  // causedDamage(player, 10);
  isPlayersTurn = false;

}

function animatePlayer(speed) {
  speed = "normal";
  if (speed === "normal") {

  }
}

function causedDamage(guy, damage) {
  // guy.currentHP -= attacker.atk - attacker.atk/guy.def;
  if (guy.currentHP > 0) {
    guy.currentHP -= damage - damage/guy.def;
  }
}

function isGameOver() {
  if (player.currentHP < 0) {
    gameState = "over";
  }
}

function healthBarDisplay(guy) {
  if (guy.currentHP > 0) {
    //grey bar
    let greyBarWidth = 110;
    let greyX = guy.x + guy.width/2 - greyBarWidth/2;
    let greyY = guy.y + guy.height + 20;

    noStroke();
    fill(100);
    rect(greyX, greyY, greyBarWidth, 30);

    //health is green
    if (guy.currentHP >= guy.maxHP/2){
      fill(80, 230, 120);
    }
    //health is red
    else if (guy.currentHP <= guy.maxHP/5){
      fill(255, 120, 80);
    }
    //health is yellow
    else {
      fill(210, 210, 80);
    }
    
    rect(greyX+5, greyY+5, guy.currentHP, 20);
    //not working V want coloured health bar to always take up the same amount of space, but rely on percentages
    // rectMode(CENTER);
    // rect(greyX-greyBarWidth/2, greyY+5, guy.currentHP, 20);
    // rectMode(CORNER);
  }

}

function displayPoints() {
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text(`points:${str(points - pointsSpent)}`, 50, 50);
}