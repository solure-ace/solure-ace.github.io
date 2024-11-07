// Lock Solver  /// "wordle but with numbers"
// Avery Waler 
// October 11th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let playerInput = [];
let thePassword = [];
let keySlot = 0; //replace this its not neccesary

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


  //temporary
  fill(250);
  text(`keyslot:${keySlot}`, 50, 200)
}



function startScreen(){
  
}



function displayGrid() {
  for (let y = 0; y < amountOfGuesses; y++){
    for (let x = 0; x < passwordLength; x++) {
      fill(255);
      // y ?? y*cellSize + height - cellSize*amountOfGuesses-cellSize*1.5
      rect(x*cellSize + width/2 - cellSize*passwordLength/2, y*cellSize +100, cellSize, cellSize);

      textAlign(CENTER, CENTER);
      fill(0);
      text(`${grid[y][x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2,
        y*cellSize +100 + cellSize/2);
    }
  }
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
  else if (keySlot < amountOfGuesses-1) { //playerInput.length-1 < amountOfGuesses
    for (let i = 1; i < 10; i++) {

      //check if its a number between 1-9
      if (Number(key) === i) {
      playerInput.push([`${key}`]);
      keySlot++;
      }

    }
  }

  // clear the current player input and replace the next open row in the (main) grid
  else if (keyCode === ENTER && keySlot === passwordLength) { //playerInput.length-1 === passwordLength
    playerInput = [];
    keySlot = 0;
  }
}



function displayPlayerInput() {
  //show whatever numbers you have typed untill you hit enter
  fill(255);

  for (let x = 0; x < passwordLength; x++) {
    //always make the grid regardless of actual player input
    fill(255);
    rect(x*cellSize + width/2 - cellSize*passwordLength/2, cellSize*amountOfGuesses + cellSize*2.5, cellSize, cellSize);

    //if there is actually something to display then display it
    if (playerInput.length > 0 && x < playerInput.length) {
      text(`${playerInput[x]}`, 30+10*x, 30); 
      // text(`${playerInput[x]}`,x*cellSize + width/2 - cellSize*passwordLength/2 + cellSize/2,
      //   y*cellSize + 100 + cellSize*amountOfGuesses + cellSize*2.5 + cellSize/2);  
    }
  }


  //currently redundant 
  // if (playerInput.length > 0) {
  //   for (let num = 0; num < passwordLength; num++){

  //     if (num < playerInput.length){
  //       text(`${playerInput[num]}`, 30+10*num, 30);  
  //     }
  //   }

    // for (let num = 0; num < passwordLength; num++){
    //   text(`${thePassword[num]}`, 30+10*num, 60);
    // }
  // }
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
