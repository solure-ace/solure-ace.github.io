// Grid demo
// Avery
// oct 22nd 2024

let cellSize;
let GRID_SIZE = 20;
let shouldToggleNeighbors = true;

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

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
 
  //toggle self
  flipCell(x, y);

  //toggle neighbors
  if (shouldToggleNeighbors) {
    flipCell(x+1, y);
    flipCell(x-1, y);
    flipCell(x, y + 1);
    flipCell(x, y - 1);
  }
}

function flipCell(theX, theY) {
  if (theX >= 0 && theX < GRID_SIZE && theY >= 0 && theY < GRID_SIZE ) {
    if(grid[theY][theX] === 1) {
      grid[theY][theX] = 0;
    }
    else {
      grid[theY][theX] = 1;
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
  if (key === "n") {
    shouldToggleNeighbors = !shouldToggleNeighbors;
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("white");
      }
      else if (grid[y][x] === 0 ) {
        fill(100, 100, 255);
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else{
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/GRID_SIZE;

}