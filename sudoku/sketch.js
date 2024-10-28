// Grid Project - Sudoku
// Avery Walker
// Oct 28th
//
// Extra for Experts:
//

let grid;

const GRID_SIZE = 9;
let cellSize;


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
      
    }
  }
}

function generateSudoku() {
  let newGrid = [];
  for (let y = 0; y < GRID_SIZE; y++){
    newGrid.push([]);
    for(let x = 0; x < GRID_SIZE; x++) {
      //checkViableNumbers(x, y);
      //push random from whatever numbers ^ returns
      newGrid.push(1);
    }
  }
  return newGrid;
}

function checkViableNumbers(mainX, mainY) {
  //needs to check row
  //check column
  //check box
  //return possible numbers
}