// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let playerInput = [1, 3, 3, 4, 5, ];
let thePassword = [];
//x
let passwordLength = 5;
//y
let amountOfGuesses = 6;

let cellSize = 60;
let gameState = "ongoing";


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid();
}

function draw() {
  background(60);
  if (gameState === "ongoing") {
    displayGrid();
    displayPlayerInput();
  }
}

function startScreen(){
  
}

function displayGrid() {
  for (let y = 0; y < amountOfGuesses; y++){
    for (let x = 0; x < passwordLength; x++) {
      fill(255);
      rect(x*cellSize + width/2 - cellSize*passwordLength/2,     y*cellSize + height - cellSize*amountOfGuesses-cellSize*1.5, cellSize, cellSize);
      textAlign(CENTER, CENTER);
      fill(0);
      text(`${grid[y][x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2, y*cellSize + height - cellSize*amountOfGuesses-cellSize*1.5 + cellSize/2);
    }
  }
}

function keyPressed() {
  let keySlot = 0;
  
  if (keyCode === BACKSPACE && keySlot !==0) {
    keySlot -= 1;
  }
  // playerInput
  else if (keySlot < amountOfGuesses) {
    for (let i = 0; i < 9; i++) {
      if (key === i) {
        playerInput += `${key}`;
        keySlot++;
        return playerInput;
      }
    }
  }
  else {
    gameState = "over";
  }
}

function displayPlayerInput() {
  fill(255);
  for (let num = 0; num < passwordLength; num++){
    text(`${playerInput[num]}`, 30+10*num, 30);  
    //text(`${thePassword[0]}`30+10*num, 60);
  }
  for (let num = 0; num < passwordLength; num++){
    text(`${thePassword[num]}`, 30+10*num, 60);

  }

  function generatePassword() {
    for( let i = 0; i < passwordLength; i++) {
      thePassword.push(0);
    }
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
}