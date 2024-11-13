// Lock Solver  /// "wordle but with numbers"
// Avery Waler 
// October 11th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//TO DO
//generatePassword(){} []
//yellow/*wrong space* colour coding []
//win state // game over state []
//reset game []
//add some sort of sound when enter is pressed && when win []


let grid = [];
let playerInput = [];
// let thePassword = [1, 2, 3, 4, 5];
let thePassword = [];
let keySlot = 0; //replace this its not neccesary
let guessCounter = 0;

//x
let passwordLength = 5;
//y
let amountOfGuesses = 6;

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
    lockOpened = checkifUnlocked();
    background(60);
    displayGrid();
    displayPlayerInputGrid();
    displayInput();

    //i want it to keep displaying "ongoing" untill it resets so the lose/winstate is overtop of "ongoing"
    if (lockOpened) {

    }
  }


  //temporary
  fill(250);
  textAlign(LEFT, TOP);
  text(`keyslot:${keySlot}`, 60, 200);
  text(`password:${thePassword}`, 60, 250);
  
}



function startScreen(){
  
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "ongoing";
  }
}

function checkifUnlocked() {
  //check if win
  let slotsUnlocked = 0;
  for (let y = 0; y < amountOfGuesses; y++){
    for (let x = 0; x < passwordLength; x++) {
      if (Number(grid[y][x]) === Number(thePassword[x])) {
        slotsUnlocked++;
      }
    }
  }
  return slotsUnlocked === passwordLength;
}



function keyPressed() {
  //keySlot is the 'x'
  // can probably replace keyslot by using playerInput.length? maybee... try later

  //backspace
  if (keyCode === BACKSPACE && keySlot !== 0) { //playerInput.length-1>0
    keySlot -= 1;
    playerInput.pop();
  }


  //playerInput
  // !
  else if (keySlot < passwordLength && guessCounter < amountOfGuesses) { //playerInput.length-1 < amountOfGuesses
    for (let i = 1; i < 10; i++) {

      //check if its a number between 1-9
      if (Number(key) === i) {
        playerInput.push([`${key}`]);
        keySlot++;
      }

    }
  }

  // clear the current player input and replace the next open row in the (main) grid
  else if (keyCode === ENTER && keySlot === passwordLength && guessCounter < amountOfGuesses) { //playerInput.length-1 === passwordLength
    for (let i = 0; i < passwordLength; i++) {
      grid[guessCounter][i] = playerInput[i];
    }
    guessCounter++;
    playerInput = [];
    keySlot = 0;
  }
}



function displayGrid() {
  for (let y = 0; y < amountOfGuesses; y++){
    for (let x = 0; x < passwordLength; x++) {
      fill(255);
      if (Number(grid[y][x]) === Number(thePassword[x])) {
        fill("green");
      }

      // y ?? y*cellSize + height - cellSize*amountOfGuesses-cellSize*1.5
      strokeWeight(5);
      stroke(60);
      rect(x*cellSize + width/2 - cellSize*passwordLength/2, y*cellSize +100, cellSize, cellSize);

      noStroke();
      textAlign(CENTER, CENTER);
      fill(0);
      text(`${grid[y][x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2,
        y*cellSize +100 + cellSize/2);
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
    fill("red");
  }
  if (lockOpened){
    fill("green");
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
