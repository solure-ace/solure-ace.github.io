// sierpinski triangle
//recursion demo
//Avery Walker


let initialTriangle = [
  {x:800, y: 50},
  {x: 350, y: 700},
  {x: 1250, y: 700}
];
let theDepth = 0;

let theColours = ["blue", "green", "red", "grey", "black", "white", "purple", "pink" ];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  noStroke();
  recursiveTriangle(initialTriangle, theDepth);
}

function mousePressed() {
  if (theDepth < 7) {
    theDepth++;
  }
}

function recursiveTriangle(points, depth) {

  fill(theColours[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  //exit clause
  if (depth > 0) {
  //draw upper triangle
    recursiveTriangle([points[0], 
      midpoint(points[0], points[1]),
      midpoint(points[0], points[2])],
    depth-1 );

    //draw left triangle
    recursiveTriangle([points[1], 
      midpoint(points[0], points[1]),
      midpoint(points[1], points[2])],
    depth-1 );

      
    //draw right triangle
    recursiveTriangle([points[2], 
      midpoint(points[0], points[2]),
      midpoint(points[1], points[2])],
    depth-1 );
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}