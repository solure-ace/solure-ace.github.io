// Character in Grid demo
// Avery
// oct 22nd 2024

let cellSize;
let GRID_SIZE = 20;
let shouldToggleNeighbors = false;
let grid = [];
const OPEN_TILE = 0;
const IMPASSIBLE_TILE = 1;
const PLAYER_TILE = 9;
let player = {
  x: 0,
  y: 0,
};

let grassImg;
let pathImg;

function preload() {
  grassImg = loadImage("grass.png");
  pathImg = loadImage("path.png");
}


function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }

  cellSize = height/GRID_SIZE;

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  //add player to grid
  grid[player.y][player.x] = PLAYER_TILE;
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
        newGrid[y].push(IMPASSIBLE_TILE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
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
    if(grid[theY][theX] === IMPASSIBLE_TILE) {
      grid[theY][theX] = OPEN_TILE;
    }
    else if (grid[theY][theX] === OPEN_TILE) {
      grid[theY][theX] = IMPASSIBLE_TILE;
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];

  // for (let i = random(0,1)) 
  for (let y = 0; y <rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);

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
  // if (key === "n") {
  //   shouldToggleNeighbors = !shouldToggleNeighbors;
  // }
  if (key === "w" ){
    //move up
    movePlayer(player.x, player.y-1);

  }
  if (key === "a" ){
    //move left
    movePlayer(player.x-1, player.y);
    
  }
  if (key === "s" ){
    //move down
    movePlayer(player.x, player.y+1);
    
  }
  if (key === "d" ){
    //move right
    movePlayer(player.x+1, player.y);
  }
}


function movePlayer(x, y) {
  if (grid[y][x] === OPEN_TILE) {
    grid[player.y][player.x] = OPEN_TILE;

    //keep track of player location
    if (x >=0 && x < GRID_SIZE && y >=0 && y < GRID_SIZE) {

      player.x = x;
      player.y = y;

      //put player in the grid
      grid[player.y][player.x] = PLAYER_TILE;
    }
  }
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === OPEN_TILE) {
        image(pathImg, x*cellSize, y*cellSize, cellSize);
      }
      else if (grid[y][x] === IMPASSIBLE_TILE ) {
        // fill("black");
        image(grassImg, x*cellSize, y*cellSize, cellSize);
      }
      else if(grid[y][x] === PLAYER_TILE) {
        fill(230);
        square(x*cellSize, y*cellSize, cellSize);
      }
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