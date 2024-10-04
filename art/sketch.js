// gererative art
// Avery Walker
// oct 4th

const TILE_SIZE = 15;
let tileArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x+= TILE_SIZE) {
    for (let y = 0; y < height; y+= TILE_SIZE) {
      let someTile = spawntile(x, y);
      tileArray.push(someTile);
    }
  }
}

function draw() {
  background(220, 180, 220);
  
  //display tile
  strokeWeight(10);
  for (let myTile of tileArray) {
    stroke(myTile.r, myTile.g, myTile.b);
    line(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}

function spawntile(x, y) {
  let tile;
  let choice = random(100);

  if (choice < 50) {
  //negative slope
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y-TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y+TILE_SIZE/2,
    };
  }
    
  if (choice > 50) {
    //negative slope
    tile = {
      x1: x-TILE_SIZE/2,
      y1: y+TILE_SIZE/2,
      x2: x+TILE_SIZE/2,
      y2: y-TILE_SIZE/2,
    };
  } 

  // y he ourple 
  tile.r = random(120, 150);
  tile.g = random(20, 100);
  tile.b = random(160, 255);
  return tile;
}

