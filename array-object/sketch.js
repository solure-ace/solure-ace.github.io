// Array and Object Notation
// Avery Walker
// October 12th 2024
//
// Extra for Experts:
// -object within an object ('player.spriteStates.h')

//enemies
let enemyArray = [];
let amountOfEnemies = 3;
//enemy spawn area
let enemySpawnWidth = 800;
let enemySpawnX = 600;

//points
let points = 100;
let pointsSpent = 0;
let enemiesDefeated = 0;

//game states  // "start" // "ongoing" // "over"
let gameState = "start";


//player
isPlayersTurn = true;
//player objects
let legs;
let backhair;
let torso;
let head;

let player = {
  currentHP: 100,
  maxHP: 100,
  height: 450,
  width: 100,
  atk: 30,
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

function preload() {
  legs = loadImage("playerlegs.png");
  backhair = loadImage("playerbackhair.png");
  torso = loadImage("playertorso.png");
  head = loadImage("playerhead.png")
}



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

  if (gameState === "start") {
    background(30);
    fill(255);
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('Click to Start', width/2, height/2);
  }

  else if (gameState === "ongoing") {
    background(0);
    displayStats();

    ///////testing 
    healthBarDisplay(player);
    // if (player.currentHP > 0) {
    //   player.currentHP -= 1;
    // }

    turnOrder();
    fill(20);

    //spawn area for enemies
    rect(enemySpawnX, 100, enemySpawnWidth, height-200);

    displayEnemy();
    displayPlayer();
  }

  else if(gameState === "over") {
    background(30);
    fill(255);
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('Game Over', width/2, height/2-100);

    textSize(16);
    text(`Total Points: ${str(points)}`, width/2, height/2-50);
    text(`Enemies Defeated: ${str(enemiesDefeated)}`, width/2, height/2);

    textSize(20);
    textStyle(BOLDITALIC);
    text('Click to Restart', width/2, height/2+100);
  }
}



// function increaseEnemies() {
// increase from 1 - 3, they collide if there is too many
//at 1 increase after 3 killed
//at 2 increase after 5 killed
//stay at three untill/unless i change the spawn parameters for enemies
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
  //i think i could put this in display enemy instead tbh
}

function displayEnemy() {
  for (let enemy of enemyArray) {
    // killEnemy();
    fill(200);

    //not actually using at the moment v
    // if (enemy.isSelected) {
    //   stroke(260);
    //   strokeWeight(3);
    // }


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
  fill(30)
  // rect(180, 510, 170, 70)
  // image(legs, player.spriteStates.hX, player.spriteStates.hY, player.spriteStates.lW, player.spriteStates.lH );
  image(legs, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // rect(player.spriteStates.hX, player.spriteStates.hY, player.spriteStates.hW, player.spriteStates.hH);
  //placeholder t
  image(backhair, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // rect(player.spriteStates.tX, player.spriteStates.tY, player.spriteStates.tW, player.spriteStates.tH);
  //placeholder l
  image(torso, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // rect(player.spriteStates.lX, player.spriteStates.lY, player.spriteStates.lW, player.spriteStates.lH);
  image(head, player.x-50, player.y+25, 200*1.1, 400*1.1);
}

function animatePlayer(speed) {
  speed = "normal";
  if (speed === "normal") {

  }
}



//temporary function
function mouseClicked() {
  // causedDamage(player, 10);
  if (gameState === "start") {
    gameState = "ongoing";
  }
  else if(gameState === "ongoing") {
    isPlayersTurn = false;
  }
  else if(gameState === "over") {
    resetGame();
    gameState = "start";
  }

}



function isGameOver() {
  if (player.currentHP < 0) {
    gameState = "over";
  }
}

function resetGame() {
  player.currentHP = player.maxHP;
}



function causedDamage(guy, damage) {
  // guy.currentHP -= attacker.atk - attacker.atk/guy.def;
  if (guy.currentHP > 0) {
    guy.currentHP -= damage - damage/guy.def;
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
    
    rect(greyX+5, greyY+5, guy.currentHP/guy.maxHP*100, 20);
    //not working V want coloured health bar to always take up the same amount of space, but rely on percentages
    // rectMode(CENTER);
    // rect(greyX-greyBarWidth/2, greyY+5, guy.currentHP, 20);
    // rectMode(CORNER);
  }

}

function displayStats() {
  fill(255);
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(`points: ${str(points - pointsSpent)}`, 30, 40);
  text(`atk: ${str(player.atk)}`, 30, 65);
  text(`def: ${str(player.def)}`, 30, 90);
}