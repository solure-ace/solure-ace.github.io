// Lock Solver  /// "wordle but with numbers"
// Avery Waler 
// October 15th
//
// Extra for Experts:
// "\n" starts a new line of text. / textLeading

let grid = [];
let playerInput = [];

// let thePassword = [1, 2, 3, 4, 5];
let thePassword = [];
let stringOfPassword = "";
let keySlot = 0;
let guessCounter = 0;

//x
const PASSWORD_LENGTH = 5;
//y
const AMOUNT_OF_GUESSES = 7;

let cellSize = 60;
let gameState = "start";
let lockOpened = false;

//Unique numbers is an easier gamemode
let passwordUsesUniqueNumbers = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid();
  thePassword = generatePassword();
}



function draw() {
  //start
  if (gameState === "start") {
    background(60);
    startScreen();
  }

  //ongoing
  if (gameState === "ongoing") {
    background(60);

    displayGrid();
    displayPlayerInputGrid();
    displayInput();

    //win message
    if (lockOpened) {
      gameWon();
    }
    //lose message
    else if (!lockOpened && guessCounter === AMOUNT_OF_GUESSES) {
      gameLost();
    }

  }
  //game title
  if (!lockOpened && guessCounter !== AMOUNT_OF_GUESSES) {
    displayTitle();
  }

  //** for testing 
  // fill(250);
  // textAlign(LEFT, TOP);
  // textSize(12);
  // text(`keyslot:${keySlot}`, 60, 200);
  // text(`password:${stringOfPassword}`, 60, 250);
}



function startScreen(){
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  text('Guess the lock combination to win \n \n GREEN: Correct number in the correct spot \n YELLOW: Number is in the combination, but in the wrong spot \n \n Press "r" to reset at anytime \n \n Click to Start ', width/2, height/2-75);

  if (passwordUsesUniqueNumbers) {
    text('\n \n \n \n Numbers in the password are unique (change with "g") \n \n \n', width/2, height/2-75);
  }
  else if (!passwordUsesUniqueNumbers) {
    text('\n \n \n \n Numbers in the password can repeat (change with "g") \n \n \n', width/2, height/2-75);
  }
}

function gameWon() {
  fill(250);
  textSize(20);
  text('You Win! \n Press "r" to reset', width/2, 60);
}

function gameLost() {
  fill(250);
  textSize(20);
  text('Game lost... \n Press "r" to reset', width/2, 60);
  text(`The password was ${stringOfPassword}`, width/2,  cellSize*AMOUNT_OF_GUESSES + cellSize*3+ cellSize );
}

function displayTitle() {
  fill(250);
  textSize(20);
  text('"LOCK SOLVER"', width/2, 50);
}

function resetGame() {
  thePassword = generatePassword();
  grid = generateEmptyGrid();
  keySlot = 0;
  guessCounter = 0;

  lockOpened = false;
  gameState = "start";
}

function checkifUnlocked() {
  //check if all of thePassword matches with all of playerInput within the same entry
  let slotsUnlocked = 0;
  for (let x = 0; x < PASSWORD_LENGTH; x++) {
    //meant to be called only after enter is pressed, which is why guessCounter-1 is used
    if (Number(grid[guessCounter-1][x]) === Number(thePassword[x])) {
      slotsUnlocked++;
    }
  }
  return slotsUnlocked === PASSWORD_LENGTH;
}




function mousePressed() {
  if (gameState === "start") {
    gameState = "ongoing";
  }
}

function keyPressed() {
  //keySlot is the 'x' in player input

  //reset the password & grid
  if (key === "r" && gameState !== "start") {
    resetGame();
  }

  if (key === "g" && gameState === "start") {
    passwordUsesUniqueNumbers = !passwordUsesUniqueNumbers;
    thePassword = generatePassword();
  }

  if (!lockOpened && gameState === "ongoing") {
    //backspace
    if (keyCode === BACKSPACE && keySlot !== 0) { 
      keySlot -= 1;
      playerInput.pop();
    }

    //playerInput // num keys (excluding 0)
    else if (keySlot < PASSWORD_LENGTH && guessCounter < AMOUNT_OF_GUESSES) {
      for (let i = 1; i < 10; i++) {

        //check if its a number between 1-9
        if (Number(key) === i) {
          playerInput.push([`${key}`]);
          keySlot++;
        }
      }
    }

    //clear the current player input and replace the next open row in the (main) grid // enter
    else if (keyCode === ENTER && keySlot === PASSWORD_LENGTH && guessCounter < AMOUNT_OF_GUESSES) {
      for (let i = 0; i < PASSWORD_LENGTH; i++) {
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
  for (let y = 0; y < AMOUNT_OF_GUESSES; y++){
    for (let x = 0; x < PASSWORD_LENGTH; x++) {

      fill(255);
      //numbers that are in the password AND in the right spot are displayed on green tiles
      if (Number(grid[y][x]) === Number(thePassword[x])) {
        fill(20, 150, 60);
      }

      //numbers that are in the password AND NOT in the right spot are displayed on yellow tiles
      else {
        for (let i = 0; i < PASSWORD_LENGTH; i++) {
          if (Number(grid[y][x]) === Number(thePassword[i])) {
            fill(220, 220, 60);
          }
        }
      }
      
      //rect
      strokeWeight(5);
      stroke(60);
      rect(x*cellSize + width/2 - cellSize*PASSWORD_LENGTH/2, y*cellSize +100, cellSize, cellSize);

      //text
      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      fill(0);

      if (grid[y][x] !== 0) {
        textSize(12);
        text(`${grid[y][x]}`,x*cellSize + width/2 - cellSize*PASSWORD_LENGTH/2 + cellSize/2,
          y*cellSize +100 + cellSize/2);
      }
    }
  }
}

function displayInput() {
  //display numbers between 1-9 that have been typed up to PASSWORD_LENGTH
  
  for (let x = 0; x < PASSWORD_LENGTH; x++) {
    if (playerInput.length > 0 && x < playerInput.length && !lockOpened) {
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      text(`${playerInput[x]}`, x*cellSize + width/2 - cellSize*PASSWORD_LENGTH/2 + cellSize/2, cellSize*AMOUNT_OF_GUESSES + cellSize*2.5 + cellSize/2);
    }
  }
}

function displayPlayerInputGrid() {
  //displays the lower grid/bar that holds the player input as it is typed
  fill(255);
  //bar changes to red in lose state
  if (guessCounter >= AMOUNT_OF_GUESSES && !lockOpened) {
    fill(230, 50, 50);
  }

  //bar changes to green when lockOpened
  else if (lockOpened){
    fill(20, 150, 60);
  }

  for (let x = 0; x < PASSWORD_LENGTH; x++) {
    strokeWeight(5);
    stroke(60);
    rect(x*cellSize + width/2 - cellSize*PASSWORD_LENGTH/2, cellSize*AMOUNT_OF_GUESSES + cellSize*2.5, cellSize, cellSize);
  }
}



function generatePassword() {
  //generate a random password when called
  let newPassword = [];
  stringOfPassword = "";
  let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for( let i = 0; i < PASSWORD_LENGTH; i++) {
    // allows to have multiple of the same number in the password
    //newPassword.push(Math.floor(random(1, 9)));


    //all numbers in the password must be unique
    if (passwordUsesUniqueNumbers) {
      let randomNumber = possibleNumbers.splice(random(0, possibleNumbers.length), 1);
      newPassword.push(randomNumber);
      stringOfPassword += randomNumber;
    }
    // allows to have multiple of the same number in the password
    else if (!passwordUsesUniqueNumbers) {
      newPassword.push(Math.floor(random(1, 9)));
      stringOfPassword += newPassword[i];
    }
  }
  return newPassword;
}

function generateEmptyGrid(){
  //generate a grid full of 0s in PASSWORD_LENGTH(x) and AMOUNT_OF_GUESSES(y) // 0s arent displayed in text
  let theGrid = [];
  for (let y = 0; y < AMOUNT_OF_GUESSES; y++) {
    theGrid.push([]);
    for (let x = 0; x < PASSWORD_LENGTH; x++) {
      theGrid[y].push(0);
    }
  }
  return theGrid;
}