// Grid demo
// Avery
// oct 22nd 2024



// if hardcoding the grid, use something like this:
// let grid = [[1, 0, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0],
//             [0, 1, 1, 0]];

let grid;
const GRID_SIZE = 40;
let cellSize;
let shouldToggleNeighbours = false;
let autoPlayIsOn = false;
let renderOnFrameMultiple = 5;
let gosperGun;


function preload() {
  gosperGun = loadJSON("gosper.json");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  background(220);
  if (autoPlayIsOn && frameCount%renderOnFrameMultiple === 0) {
    grid = updateGrid();
  }
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  //toggle neighbours
  if (shouldToggleNeighbours) {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
    autoPlayIsOn = false;
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
    autoPlayIsOn = false;
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === " ") {
    grid = updateGrid();
  }
  if (key === "p"){
    autoPlayIsOn = !autoPlayIsOn;
  }
  if (key === "g") {
    grid = gosperGun;
    autoPlayIsOn = false;
  }
}

function updateGrid() {
  //make a new array to hold the next turn
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  //look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      //count it's neighbours
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //don't fall of the edge
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //don't count yourself
      neighbours -= grid[y][x];

      //apply the rules 
      if (grid[y][x] === 0) {
        //currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 1) {
        //currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //choose either 0 or 1, each 50% of the time
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

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

// let cellSize;
// let GRID_SIZE = 20;
// let shouldToggleNeighbors = false;

// // let grid = [[1, 0, 1, 0],
// //             [0, 0, 1, 1],
// //             [1, 1, 1, 0],
// //             [0, 1, 1, 0]];
// let grid = [];

// function setup() {
//   if (windowWidth < windowHeight) {
//     createCanvas(windowWidth, windowWidth);
//   }
//   else{
//     createCanvas(windowHeight, windowHeight);
//   }

//   cellSize = height/GRID_SIZE;

//   grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
// }

// function draw() {
//   background(220);
//   noStroke();
//   displayGrid();
// }

// function generateRandomGrid(cols, rows) {
//   let newGrid = [];

//   // for (let i = random(0,1)) 
//   for (let y = 0; y <rows; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//       // newGrid[y].push(random(0,1));
//       if (random(100) < 50) {
//         newGrid[y].push(1);
//       }
//       else {
//         newGrid[y].push(0);
//       }
//     }
//   }
//   return newGrid;
// }

// function mousePressed() {
//   let x = Math.floor(mouseX/cellSize);
//   let y = Math.floor(mouseY/cellSize);
 
//   //toggle self
//   flipCell(x, y);

//   //toggle neighbors
//   if (shouldToggleNeighbors) {
//     flipCell(x+1, y);
//     flipCell(x-1, y);
//     flipCell(x, y + 1);
//     flipCell(x, y - 1);
//   }
// }

// function flipCell(theX, theY) {
//   if (theX >= 0 && theX < GRID_SIZE && theY >= 0 && theY < GRID_SIZE ) {
//     if(grid[theY][theX] === 1) {
//       grid[theY][theX] = 0;
//     }
//     else {
//       grid[theY][theX] = 1;
//     }
//   }
// }

// function generateEmptyGrid(cols, rows) {
//   let newGrid = [];

//   // for (let i = random(0,1)) 
//   for (let y = 0; y <rows; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//       newGrid[y].push(0);

//     }
//   }
//   return newGrid;
// }


// function keyPressed() {
//   if (key === "r") {
//     grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
//   }
//   if (key === "e") {
//     grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
//   }
//   if (key === "n") {
//     shouldToggleNeighbors = !shouldToggleNeighbors;
//   }
//   if (key === " ") {
//     grid = updateGrid();
//   }
// }

// function updateGrid() {
//   let nextGrid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       //count alive neighbors
//       let neighborsAlive = 0;

//       // for (let theY = y - 1; theY < y + 1; theY++) {
//       //   for (let theX = x - 1; theX < x + 1; theX++) {
//       //   }

//       for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++){

//           //dont fall off the edge
//           if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
//             neighbors += grid[y+1][x+1];
//           }

//         }      
//         //dont count yourself
//         neighbors -= grid[y][x];


//         //apply rules of the game
//         if (grid[y][x] === 0) {
//           if (neighborsAlive === 3) {
//             nextGrid[y][x] = 1;
//           }
//         }
//         // else (grid[y][x] === 1) {
//         // if (neighborsAlive < 2) {
//         //   nextGrid[theY][theX] = 0;
//         // else if (neighborsAlive === 3) {
//         //   nextGrid[theY][theX] = 1;
//         // }
//         // else if (neighborsAlive > 3){
//         //   nextGrid[theY][theX] = 0;
//         // }

//       }
//     }
//   }
// } 


// function displayGrid() {
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       if (grid[y][x] === 1) {
//         fill("white");
//       }
//       else if (grid[y][x] === 0 ) {
//         fill(100, 100, 255);
//       }
//       square(x*cellSize, y*cellSize, cellSize);
//     }
//   }
// }

// function windowResized() {
//   if (windowWidth < windowHeight) {
//     resizeCanvas(windowWidth, windowWidth);
//   }
//   else{
//     resizeCanvas(windowHeight, windowHeight);
//   }

//   cellSize = height/GRID_SIZE;

// }
