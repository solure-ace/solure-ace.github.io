// Array and Object Notation
// Avery Walker
// October 21th 2024

//*Works best in fullscreen

// Extra for Experts:
// -object within an object? ('player.sprite.h')
// -Math.trunc()
// -enemyArray[enemyIndex].atk
// -Animated player sprite (*animated with code not an animatedpng)



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
let buttonsY = 175;
let buttonsWidth = 80;
let buttonsHeight = 40;
let buttonsGapHeight = 30;

let healthCost = 100;
let defCost = 150;
let atkCost = 200;

//game states  // "start" // "ongoing" // "over"
let gameState = "start";

//player
isPlayersTurn = true;
let legs;
let backHair;
let torso;
let head;

let player = {
  currentHP: 100,
  maxHP: 100,
  height: 400*1.1,
  width: 200*1.1,
  atk: 30,
  def: 50,
  x: 0,
  y: 145,

  sprite: {
    //head
    hX: 0,
    hY: 145,
    hSpeed: -0.1,
    //torso
    tX: 0,
    tY: 145,
    tSpeed: -0.1,
    //legs
    lX: 0,
    lY: 145,
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
  player.x = width/7-50;
  //enemy control
  for (let i = 0; i < amountOfEnemies; i++) {
    spawnEnemy();
  }
}

function draw() {
  ///////keep
  isGameOver();

  if (gameState === "start") {
    background(30);
    startScreen();
  }


  else if (gameState === "ongoing") {
    background(0);
    displayStats();

    spawnEnemyWaves();
    turnOrder();

    //spawn area for enemies
    turnOrder();
    fill(20);
    rect(enemySpawnX, 100, enemySpawnWidth, height-200);

    //shop/buttons
    healthButton();
    defButton();
    atkButton();

    //player + enemies
    displayEnemy();
    animatePlayer();
    displayPlayer();
    healthBarDisplay(player);
  }


  else if(gameState === "over") {
    background(30);

    endScreen();
  }
}

function startScreen() {
  fill(255);
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Click to Start', width/2, height/2);
}

function endScreen() {
  fill(255);
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Game Over', width/2, height/2-100);

  textSize(16);
  text(`Total Points: ${str(Math.trunc(points))}`, width/2, height/2-50);
  text(`Enemies Defeated: ${str(enemiesDefeated)}`, width/2, height/2);

  textSize(20);
  textStyle(BOLDITALIC);
  text('Click to Restart', width/2, height/2+100);
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
      enemyArray.splice(enemy, 1);
      enemiesDefeated += 1;
      points += enemy.maxHP*1.2;
    }
  }
}

//controls which enemy attacks
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

function displayPlayer() {
  image(legs, player.x, player.y, player.width, player.height);
  image(backHair, player.x, player.sprite.hY, player.width, player.height);
  image(torso, player.x, player.sprite.tY, player.width, player.height);
  image(head, player.x, player.sprite.hY, player.width, player.height);
//   //placeholder h
//   rect( player.sprite.hX, player.sprite.hY, player.sprite.hW, player.sprite.hH );
//   //placeholder t
//   rect(player.sprite.tX, player.sprite.tY, player.sprite.tW, player.sprite.tH);
//   //placeholder l
//   rect(player.sprite.lX, player.sprite.lY, player.sprite.lW, player.sprite.lH);
}

function animatePlayer() {

  //torso
  player.sprite.tY += player.sprite.tSpeed;
  if (player.sprite.tY < player.y - 5 || player.sprite.tY > player.y) {
    player.sprite.tSpeed *= -1;
  }

  //head (+backHair)
  player.sprite.hY += player.sprite.hSpeed*0.6;
  if (player.sprite.hY < player.y - 3 || player.sprite.tY > player.y) {
    player.sprite.hSpeed *= -1;
  }
}



function mouseClicked() {
  if (gameState === "start") {
    gameState = "ongoing";
  }

  else if(gameState === "ongoing") {

    if (isPlayersTurn){

      //health+ button
      if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && mouseY > buttonsHeight && mouseY < buttonsHeight + buttonsY &&
         isPlayersTurn && points - pointsSpent >=healthCost) {  

        player.currentHP = player.maxHP;
        pointsSpent += healthCost;
      }

      //def+ button
      if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && 
        mouseY > buttonsY + buttonsHeight + buttonsGapHeight && mouseY < buttonsY + buttonsHeight*2 + buttonsGapHeight &&
         isPlayersTurn && points - pointsSpent >=defCost) {

        player.def += 5;
        pointsSpent += defCost;
      }
      
      //atk+ button
      if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && 
        mouseY > buttonsY + buttonsHeight*2 + buttonsGapHeight*2 && mouseY < buttonsY + buttonsHeight*3 + buttonsGapHeight*2 &&
         isPlayersTurn && points - pointsSpent >= atkCost) {
          
        player.atk += 10;
        pointsSpent += atkCost;
      }

      //attack enemies
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

//resets everything to the baseline
function resetGame() {
  player.currentHP = player.maxHP;
  points = 0;
  pointsSpent = 0;

  enemiesDefeated = 0;
  amountOfEnemies = 1;
  enemyArray = [];

  player.sprite.tY = 145;
  player.sprite.hY = 145;
}



//returns player to full health (player.currentHP) at the cost of healthCost(100) points
function healthButton() {
  //mouse hover
  if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && mouseY > buttonsY && mouseY < buttonsHeight + buttonsY && isPlayersTurn) {
    fill(255, 120, 80); //red
    rect(buttonsX, buttonsY, buttonsWidth, buttonsHeight);

    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(`Cost: ${str(healthCost)}`, buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4);
  }
  //!mouse hover
  else {
    fill(30);
    rect(buttonsX, buttonsY, buttonsWidth, buttonsHeight);

    textSize(16);
    textAlign(CENTER);
    fill(255, 120, 80); //red
    text('HP+', buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4);
  }
  rectMode(CORNER);
}

//increases the players defense (player.def) at the cost of defCost(150) points
function defButton() {
  //mouse hover
  if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && 
    mouseY > buttonsY + buttonsHeight + buttonsGapHeight && mouseY < buttonsY + buttonsHeight*2 + buttonsGapHeight && isPlayersTurn) {

    fill(80, 230, 120); //green
    rect(buttonsX, buttonsY + buttonsHeight + buttonsGapHeight , buttonsWidth, buttonsHeight);

    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(`Cost: ${str(defCost)}`, buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4 + buttonsHeight + buttonsGapHeight);
  }
  //!mouse hover
  else {
    fill(30);
    rect(buttonsX, buttonsY + buttonsHeight + buttonsGapHeight, buttonsWidth, buttonsHeight);

    textSize(16);
    fill(0);
    textAlign(CENTER);
    fill(80, 230, 120); //green
    text(`DEF+`, buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4 + buttonsHeight + buttonsGapHeight);
  }
  rectMode(CORNER);
}

// increases the players attack (player.atk) at the cost of atkCost (200) points
function atkButton() {
  //mouse hover
  if (mouseX > buttonsX && mouseX < buttonsX + buttonsWidth && 
    mouseY > buttonsY + buttonsHeight*2 + buttonsGapHeight*2 && mouseY < buttonsY + buttonsHeight*3 + buttonsGapHeight*2 && isPlayersTurn) {

    fill(255);
    rect(buttonsX, buttonsY + buttonsHeight*2 + buttonsGapHeight*2 , buttonsWidth, buttonsHeight);

    fill(30);
    textSize(16);
    textAlign(CENTER);
    text(`Cost: ${str(atkCost)}`, buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4 + buttonsHeight*2 + buttonsGapHeight*2);
  }
  //!mouse hover
  else {
    fill(30);
    rect(buttonsX, buttonsY + buttonsHeight*2 + buttonsGapHeight*2, buttonsWidth, buttonsHeight);

    textSize(16);
    textAlign(CENTER);
    fill(255);
    text(`ATK+`, buttonsX + buttonsWidth/2, buttonsY + buttonsHeight/4 + buttonsHeight*2 + buttonsGapHeight*2);
  }
  rectMode(CORNER);
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