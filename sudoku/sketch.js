// Grid Project - Sudoku
// Avery Walker
// Oct 30th
//
// !!!changed 2-D grid project to 'lockSolver'

let answerGrid;
let playerGrid;
let testGrid = [1, 2, 3, 4, 5, 6, 7, 8];

const GRID_SIZE = 9;
let cellSize;
//need a variable per cell about whether to show it or not....
let showAllNumbers = false;
let showAnswerGrid = true;

let gamedifficulty = "medium";


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = 60;

  answerGrid = generateSudoku();
  playerGrid = generateEmptyGrid();
}

function draw() {
  background(225);
  if (showAnswerGrid) {
    displaySudoku(answerGrid);
  }
  displaySudoku(playerGrid);
}

function displaySudoku(grid) {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      fill(30);
      square(x*cellSize + (width/2-cellSize*9/2), y*cellSize+100, cellSize);
      fill(200);
      textAlign(CENTER, CENTER);

      if (showAllNumbers) {
        text(`${grid[y][x]}`,   x*cellSize + (width/2-cellSize*9/2) + cellSize/2,   y*cellSize + 100 + cellSize/2);
      }
      displayNumber(grid);
    }
  }
}

function displayNumber(theGrid) {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {

      //            shows number that the mouse hovers over
      if (mouseX > x*cellSize + (width/2-cellSize*9/2) && mouseX <x*cellSize + (width/2-cellSize*9/2) + cellSize 
      && mouseY > y*cellSize + 100 && mouseY < y*cellSize + 100 + cellSize) {
        text(`${theGrid[y][x]}`,   x*cellSize + (width/2-cellSize*9/2) + cellSize/2,
          y*cellSize + 100 + cellSize/2);
      }
    }
  }
}

function generateSudoku() {
  let possibleNumbers;
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      // possibleNumbers = checkViableNumbers(x, y, newGrid);

      newGrid[y].push(random(possibleNumbers));
    }
  }
  return newGrid;
}

// function generateSudoku() {
//   //trying 3x3 starttt
//   let newGrid = [];
//   //0,0 - 2,2
//   let i = 1;
//   for (let y = 0; y < GRID_SIZE/3*1; y++){
//     newGrid.push([]);
//     for(let x = 0; x < GRID_SIZE/3*1; x++) {
//       newGrid[y][x] = random([1,2,3,4,5,6,7,8,9]);
//       if (i<3) {
//         i++;
//       }
//     }
//   }
// for (let y = GRID_SIZE/3; y < GRID_SIZE/3*2; y++){
//   newGrid.push([]);
//   for(let x = GRID_SIZE/3; x < GRID_SIZE/3*2; x++) {
//     newGrid[y][x] = random([1,2,3,4,5,6,7,8,9]);
//   }
// }
// for (let y = GRID_SIZE/3*2; y < GRID_SIZE; y++){
//   newGrid.push([]);
//   for(let x = GRID_SIZE/3*2; x < GRID_SIZE; x++) {
//     newGrid[y][x] = random([1,2,3,4,5,6,7,8,9]);
//   }
// }
// }

// function generateSudoku() {
//   let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   let newGrid = [];
//   let y = 0;
//   for(let x = 0; x < GRID_SIZE; x++) {
//     theNum = possibleNumbers.pop(random(possibleNumbers.length-1));
//     console.log(theNum);
//     // possibleNumbers = checkViableNumbers(x, y, newGrid);

//     newGrid[y].push(random(possibleNumbers));
//   }
//   for (let y = 1; y < GRID_SIZE; y++){
//     newGrid.push([]);
//     for(let x = 0; x < GRID_SIZE; x++) {
//       newGrid[y].push(0);
//     }
//   }
//   return newGrid;
// }

function generateEmptyGrid() {
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}


function ChooseHints() {
  //hard = 17 hints
  //medium = 21 hints
  if (gamedifficulty === "medium") {
    
  }
  //easy = 24 hints
}

function checkViableNumbers(currentX, currentY, theGrid) {
  let viableNumbers = [];
  //use for generation (,,, also use for auto-candidate if i add that?)

  //grid[0][0] // dont need to check anything
  if (currentX === 0 && currentY === 0) {
    //first one can be any so dont remove anything
    return [1, 2, 3, 4, 5, 6, 7, 8 ,9 ];
  }

  //grid[0][0-8] need to check everything to the left
  if (currentY === 0 && currentX !== 0) {

    //go backwards 1 untill less than zero
    for (let x = currentX-1; x < 0; x -= 1) {

      //remove numbers that are already on the grid behind currentX
      for (let number = 1; i < 9; i++) {
        //if spot on the grid where currently looking is not-NVM need to have a bannedNumber list 
        //then subtract that number list from the viable numbers.....



        //!!!!!!!!!!!!!!!!!!!!!!!!
        if (theGrid[0][x] === number) {
          viableNumbers.push(number);
        }
      }
    }

    //grid[0-8][0] // need to check all above, none to the left
    //check column
    //check box
    // return possible numbers
  }
  return numberCandidates;
}