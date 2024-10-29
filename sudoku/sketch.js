// Grid Project - Sudoku
// Avery Walker
// Oct 29th
//
// Extra for Experts:
//

let grid;

const GRID_SIZE = 9;
let cellSize;
//need a variable per cell about whether to show it or not....
let showAllNumbers = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = 60;

  grid = generateSudoku();
}

function draw() {
  background(225);
  displaySudoku();
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

function mouseClicked() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
    }
  }
}

function generateSudoku() {
  let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      //checkViableNumbers(x, y);
      //push random from whatever numbers ^ returns
      newGrid[y].push(random(possibleNumbers));
    }
  }
  return newGrid;
}

function ChooseHints() {
  //select what cells the player will be able to see
}

function checkViableNumbers(mainX, mainY) {
  //needs to check row
  //check column
  //check box
  //return possible numbers
}