// Lock Solver  /// "wordle but with numbers"
// Avery Waler 
// October 14th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//TO DO
//generatePassword(){} [✔]
//yellow/*wrong space* colour coding [✔]
//win state // game over state [✔][ ]
//reset game [ ]
//add some sort of sound when enter is pressed && when win [ ]


let grid = [];
let playerInput = [];
// let thePassword = [1, 2, 3, 4, 5];
let thePassword = [];
let keySlot = 0; //replace this its not neccesary
let guessCounter = 0;

//x
let passwordLength = 5;
//y
let amountOfGuesses = 7;

let cellSize = 60;
let gameState = "start";
let lockOpened = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid();
  thePassword = generatePassword();
}



function draw() {

  if (gameState === "start") {
    background(60);
    startScreen();
  }
  if (gameState === "ongoing") {
    background(60);
    displayGrid();
    displayPlayerInputGrid();
    displayInput();

    //i want it to keep displaying "ongoing" untill it resets so the lose/winstate is overtop of "ongoing"
    if (lockOpened) {
      text('You Win!', width/2, 50);
    }
  }


  //temporary
  fill(250);
  textAlign(LEFT, TOP);
  text(`keyslot:${keySlot}`, 60, 200);
  text(`password:${thePassword}`, 60, 250);
  
}



function startScreen(){
  textAlign(CENTER, CENTER);
  
  text('Guess the lock combination to win \n \n GREEN: correct number in the correct spot \n YELLOW: number is in the combination, but in the wrong spot\n \n Click to Start', width/2, height/2-75);
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "ongoing";
  }
}

function checkifUnlocked() {

  //check if win
  let slotsUnlocked = 0;
  for (let x = 0; x < passwordLength; x++) {
    if (Number(grid[guessCounter-1][x]) === Number(thePassword[x])) {
      slotsUnlocked++;
    }
  }
  return slotsUnlocked === passwordLength;
}



function keyPressed() {
  //keySlot is the 'x'

  if (!lockOpened && gameState === "ongoing") {
    //backspace
    if (keyCode === BACKSPACE && keySlot !== 0) { 
      keySlot -= 1;
      playerInput.pop();
    }

    //playerInput // num keys (excluding 0)
    else if (keySlot < passwordLength && guessCounter < amountOfGuesses) {
      for (let i = 1; i < 10; i++) {

        //check if its a number between 1-9
        if (Number(key) === i) {
          playerInput.push([`${key}`]);
          keySlot++;
        }

      }
    }

    //clear the current player input and replace the next open row in the (main) grid // enter
    else if (keyCode === ENTER && keySlot === passwordLength && guessCounter < amountOfGuesses) {
      for (let i = 0; i < passwordLength; i++) {
        grid[guessCounter][i] = playerInput[i];
      }
      guessCounter++;
      playerInput = [];
      keySlot = 0;
      lockOpened = checkifUnlocked();
    }
  }
}



function displayGrid() {
  for (let y = 0; y < amountOfGuesses; y++){
    for (let x = 0; x < passwordLength; x++) {

      fill(255);
      //numbers that are in the password AND in the right spot are displayed on green tiles
      if (Number(grid[y][x]) === Number(thePassword[x])) {
        fill(20, 150, 60);
      }

      //numbers that are in the password AND NOT in the right spot are displayed on yellow tiles
      else {
        for (let i = 0; i < passwordLength; i++) {
          if (Number(grid[y][x]) === Number(thePassword[i])) {
            fill(220, 220, 60);
          }
        }
      }

      strokeWeight(5);
      stroke(60);
      rect(x*cellSize + width/2 - cellSize*passwordLength/2, y*cellSize +100, cellSize, cellSize);

      noStroke();
      textAlign(CENTER, CENTER);
      fill(0);
      if (grid[y][x] !== 0) {
        text(`${grid[y][x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2,
          y*cellSize +100 + cellSize/2);
      }
    }
  }
}



function displayInput() {
  //if there is actually something to display then display it
  
  for (let x = 0; x < passwordLength; x++) {
    if (playerInput.length > 0 && x < playerInput.length && !lockOpened) {

      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(`${playerInput[x]}`, x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2, cellSize*amountOfGuesses + cellSize*2.5 + cellSize/2);

      //text(`${playerInput[x]}`, 30+10*x, 30);

      // text(`${playerInput[x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2,
      //   y*cellSize + 100 + cellSize*amountOfGuesses + cellSize*2.5 + cellSize/2);  
    }
  }
}

function displayPlayerInputGrid() {
  //show whatever numbers you have typed untill you hit enter
  fill(255);
  if (guessCounter >= amountOfGuesses && !lockOpened) {
    fill(230, 50, 50);
  }
  else if (lockOpened){
    fill(20, 150, 60);
  }
  for (let x = 0; x < passwordLength; x++) {
    strokeWeight(5);
    stroke(60);
    rect(x*cellSize + width/2 - cellSize*passwordLength/2, cellSize*amountOfGuesses + cellSize*2.5, cellSize, cellSize);
  }
}




function generatePassword() {
  let newPassword = [];
  for( let i = 0; i < passwordLength; i++) {
    newPassword.push(Math.floor(random(1, 9)));
  }
  return newPassword;
}

function generateEmptyGrid(){
  let theGrid = [];
  for (let y = 0; y < amountOfGuesses; y++) {
    theGrid.push([]);
    for (let x = 0; x < passwordLength; x++) {
      theGrid[y].push(0);
    }
  }
  return theGrid;
}
