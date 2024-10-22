// Grid demo
// Avery
// oct 22nd 2024

let cellSize;
let GRID_SIZE = 20;

// let grid = [[1, 0, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0],
//             [0, 1, 1, 0]];
let grid = [];

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }

  cellSize = height/GRID_SIZE;

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  noStroke();
  displayGrid();
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];

  // for (let i = random(0,1)) 
  for (let y = 0; y <rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // newGrid[y].push(random(0,1));
      if (random(100) < 50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function mouseClicked() {
  for (let y = 0; y <rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (mouseX < x*cellSize && mouseX > x*cellSize + cellSize && mouseY < y*cellSize && mouseY > y*cellSize + cellSize) {
        if(grid[y][x] === 1) {
          grid[y][x] = 0;
        }
        else {
          grid[y][x] = 1;
        } 
      }
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];

  // for (let i = random(0,1)) 
  for (let y = 0; y <rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);

    }
  }
  return newGrid;
}


function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill(20, 0, 30);
      }
      else if (grid[y][x] === 0 ) {
        fill(220, 190, 255);
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}