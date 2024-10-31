// Grid Project - Sudoku Copy
// Avery Walker
// Oct 30th
//
// Extra for Experts:
//
//does not really do what i want it to....

let grid;
let testGrid = [[]];

const GRID_SIZE = 9;
let cellSize;
//need a variable per cell about whether to show it or not....
let showAllNumbers = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = 60;

  grid = generateSudoku();
}

function draw() {
  background(225);
  displaySudoku();
  displayNumber();
}

function displaySudoku() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      fill(30);
      square(x*cellSize + (width/2-cellSize*9/2), y*cellSize+100, cellSize);
      fill(200);
      textAlign(CENTER, CENTER);

      if (showAllNumbers) {
        text(`${grid[y][x]}`,   x*cellSize + (width/2-cellSize*9/2) + cellSize/2,   y*cellSize + 100 + cellSize/2);
      }

    }
  }
}

//doesnt work
// function mouseClicked() {
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       text(`${grid[y][x]}`,   x*cellSize + (width/2-cellSize*9/2) + cellSize/2,   y*cellSize + 100 + cellSize/2);
//     }
//   }
// }


function displayNumber() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      //  shows number that the mouse hovers over
      if (mouseX > x*cellSize + (width/2-cellSize*9/2) && mouseX <x*cellSize + (width/2-cellSize*9/2) + cellSize 
      && mouseY > y*cellSize + 100 && mouseY < y*cellSize + 100 + cellSize) {
        text(`${grid[y][x].answer}`,   x*cellSize + (width/2-cellSize*9/2) + cellSize/2,
          y*cellSize + 100 + cellSize/2);
      }




    }
  }
}


function generateSudoku() {
  // let possibleNumbers;
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++){
    // newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      // possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      newGrid[y].push(answerNumbers());
    }
  }
  return newGrid;
}

function answerNumbers() {
  let possibleNumbers;
  let sudoku = {
    isClue: false,
    playerInput: 0,
  };

  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      
      let answer = sudoku.push(random(possibleNumbers));
    }
  }
  newGrid[y].push(sudoku);
  return newGrid;
}

function ChooseHints() {
  //select what cells the player will be able to see
}

function checkViableNumbers(currentX, currentY, numberCandidates, theGrid) {
  let bannedNumbers = [];
  //use for generation (,,, also use for auto-candidate if i add that?)
  if (currentX === 0 && currentY === 0) {
    //first one can be any so dont remove anything
    return false;

  }

  if (currentY === 0 && currentX !== 0) {
    //anything in the first row so check all behind
    for (let x = currentX-1; x < 0; x -= 1) {
      numberCandidates[0][x] = 0;
    }
    //needs to check row
    //check column
    //check box
    // return possible numbers
  }
  return numberCandidates;
}