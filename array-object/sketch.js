// Array and Object Notation
// Avery Walker
// October 12th 2024
//
// Extra for Experts:
// -object within an object ('player.spriteStates.h')
// -Math.trunc
// -enemyArray[enemyIndex].atk

//enemies
let enemyArray = [];
let amountOfEnemies = 1;
let enemyIndex = 0;
//enemy spawn area
let enemySpawnWidth = 800;
let enemySpawnX = 600;

//points
let points = 0;
let pointsSpent = 0;
let enemiesDefeated = 0;

//shop/buttons
let buttonsX = 30;
let buttonsY = 150;
let buttonsWidth = 80;
let buttonsHeight = 40;
let healthCost = 100;

//game states  // "start" // "ongoing" // "over"
let gameState = "start";


//player
isPlayersTurn = true;
//player objects
let legs;
let backHair;
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
  backHair = loadImage("playerbackHair.png");
  torso = loadImage("playertorso.png");
  head = loadImage("playerhead.png");
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

    spawnEnemyWaves();
    turnOrder();
    fill(20);

    //spawn area for enemies
    rect(enemySpawnX, 100, enemySpawnWidth, height-200);

    healthButton();

    displayEnemy();
    displayPlayer();
    healthBarDisplay(player);
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




function spawnEnemy() {
  let randomHP = random(50, 150);
  let someEnemy = {
    maxHP: randomHP, 
    currentHP: randomHP,
    atk: random(5, 15),
    def: random(10, 30),
    width: 80,
    height: 80,
    x: random(enemySpawnX + 80, enemySpawnX + enemySpawnWidth-80),
    y: random(120, height-220),
    isSelected: false,
  };
  enemyArray.push(someEnemy);

}

function spawnEnemyWaves() {
  if (enemyArray.length === 0) {
    if (enemiesDefeated <= 3) {
      spawnEnemy();
    } 
    else if(enemiesDefeated <= 5) {
      spawnEnemy();
      spawnEnemy();
    }
    else if (enemiesDefeated > 5 ) {
      for (let i = 0; i < 3; i++) {
        spawnEnemy();
      }
    }
  }
}

function displayEnemy() {
  for (let enemy of enemyArray) {
    if (enemy.currentHP > 0) { 
      fill(200);

      //no current application 
      // if (enemy.isSelected) {
      //   stroke(260);
      //   strokeWeight(3);
      // }


      rect(enemy.x, enemy.y, enemy.width, enemy.height);
      noStroke();
      healthBarDisplay(enemy);

      if (mouseX > enemy.x && mouseX < enemy.x + enemy.width && mouseY > enemy.y && mouseY < enemy.y + enemy.height) {
        fill(255, 120, 80);
        rect(enemy.x+20, enemy.y+20, enemy.width-40, enemy.height-40);
      }
    }
    else {
      enemyArray.splice(enemyArray.indexOf[enemy], 1);
      enemiesDefeated += 1;
      points += enemy.maxHP*1.5;
    }
  }
}



function turnOrder() {
  if (enemyIndex >= amountOfEnemies) {
    enemyIndex = 0;
  }
  if (!isPlayersTurn) {
    player.currentHP -= enemyArray[enemyIndex].atk - enemyArray[enemyIndex].atk/player.def ;
    enemyIndex += 1;
    isPlayersTurn = true;
  }


}

//not currently using :(
// function changeSpriteStates() {
//   if (player.currentHP < player.maxHP/2) {
//     player.spriteStates.h = "low";
//   }
//   else if (player.currentHP >= player.maxHP/2) {
//     player.spriteStates.h = "default";
//     player.spriteStates.t = "default";
//     player.spriteStates.rA = "default";
//     player.spriteStates.lA = "default";
//   }
//   if (tookDamage(player)) {
//     player.spriteStates.h = "hit";
//     player.spriteStates.t = "hit";
//     player.spriteStates.rA = "hit";
//     player.spriteStates.lA = "hit";
//     for(let i = 0; i < 300; i++) {
//       player.spriteStates.h = "default";
//       player.spriteStates.t = "default";
//       player.spriteStates.rA = "default";
//       player.spriteStates.lA = "default";
//     }
//   }
// }

function displayPlayer() {

  player.spriteStates.h = "low";
  if (player.spriteStates.h === "low") {
    fill("yellow");
  }
  else { // if (spriteStates.h === "default" && spriteStates.t === "default")
    fill("green");
  }

  // image(legs, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // image(backHair, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // image(torso, player.x-50, player.y+25, 200*1.1, 400*1.1);
  // image(head, player.x-50, player.y+25, 200*1.1, 400*1.1);

  //placeholder h
  rect( player.spriteStates.hX, player.spriteStates.hY, player.spriteStates.hW, player.spriteStates.hH );
  //placeholder t
  rect(player.spriteStates.tX, player.spriteStates.tY, player.spriteStates.tW, player.spriteStates.tH);
  //placeholder l
  rect(player.spriteStates.lX, player.spriteStates.lY, player.spriteStates.lW, player.spriteStates.lH);

}

function animatePlayer(speed) {
  speed = "normal";
  if (speed === "normal") {

  }
}



function mouseClicked() {
  if (gameState === "start") {
    gameState = "ongoing";
  }

  else if(gameState === "ongoing") {

    if (isPlayersTurn){
      if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && mouseY > buttonsHeight && mouseY < buttonsHeight + buttonsY && points > healthCost) {
        players.currentHP = player.maxHP;
        pointsSpent += healthCost;
      }

      for (let enemy of enemyArray) {
        if (mouseX > enemy.x && mouseX < enemy.x + enemy.width && mouseY > enemy.y && mouseY < enemy.y + enemy.height) {
          enemy.currentHP -= player.atk - player.atk/enemy.def;
          isPlayersTurn = false;
        }
      }
    }
    
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
  amountOfEnemies = 1;
  points = 0;
  pointsSpent = 0;
  enemiesDefeated = 0;
}


function healthButton() {
  if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && mouseY > buttonsHeight && mouseY < buttonsHeight + buttonsY && isPlayersTurn) {
    fill("red");
    rect(buttonsX, buttonsY, buttonsWidth, buttonsHeight);
    fill(255);
    textSize(16);
    text('cost:100', buttonsX+ 5, buttonsY + 10);
  }
  else {
    fill(40);
    rect(buttonsX, buttonsY, buttonsWidth, buttonsHeight);
    textSize(16);
    fill(0);
    text('HP+', buttonsX + 10, buttonsY + 10);
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
  }
}

function displayStats() {
  fill(255);
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(`points: ${str(Math.trunc(points - pointsSpent))}`, 30, 40);
  text(`atk: ${str(player.atk)}`, 30, 65);
  text(`def: ${str(player.def)}`, 30, 90);
}
