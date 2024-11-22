// Collide 2d Demo
//Avery 
//ovember 22nd

let hit = false;
const triPoly = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  collideDebug(true); // enable debug mode

  triPoly[0] = createVector(300, 200);
  triPoly[1] = createVector(350, 300);
  triPoly[2] = createVector(250, 300);
}

function draw() {
  background(255);

  // We could for loop over the triPoly[] to draw it with a begin/endShape, but this is simpler: :)
  triangle(300, 200, 350, 300, 250, 300);
  // Or:
  // triangle(triPoly[0].x, triPoly[0].y, triPoly[1].x, triPoly[1].y, triPoly[2].x, triPoly[2].y);

  circle(mouseX, mouseY, 45);

  hit = collideCirclePoly(mouseX, mouseY, 45, triPoly);

  if (hit) {
    stroke("red");
    fill("red");
  }
  else {
    stroke("black");
    noFill();
  }
  // Use vectors as input:
  // const mouse    = createVector(mouseX, mouseY);
  // const diameter = 45;
  // hit = collideCirclePolyVector(mouse, diameter, triPoly, true);

  // stroke(hit ? color('red') : 0);
  // print('colliding?', hit);
  console.log('colliding?', hit);
}