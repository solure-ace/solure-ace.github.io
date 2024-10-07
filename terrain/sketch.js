// Terrain Generation Demo
// Avery Walker
// oct 7th 2024

let terrain = [];
let NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width/ NUMBER_OF_RECTS; 
  generateTerrain(howWide);
  
}

function draw() {
  background(10);

  fill(220, 180, 240);
  noStroke();
  for (let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function spawnRect(leftSide, rectHeight, rectWidth) {
  let theRect = {
    x: leftSide,
    y: height-rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}

function generateTerrain(rWidth) {
  let time = 0;
  let deltaTime = 0.001;
  for (let x = 0; x < width; x += rWidth) {
    let rHeight = noise(time)*height;
    let someRect = spawnRect(x, rHeight, rWidth);
    terrain.push(someRect);
    time += deltaTime;
  }
}