// Bubble object notation demo
//showing how to delete objects from the array

let theBubbles = [];
let deathArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i <5; i++) {
    spawnBubble();
  }
  window.setInterval(spawnBubble, 300);
  window.setInterval(deleteGraves, 600);
}

function draw() {
  background(0);

  // moveBubblesRandomly();
  moveBubblesWithNoise();

  displayBubbles();
  displayGraves();
}

//Bubbles
////popping bubbles
function clickedOnBubble(mX, mY, theBubble) {
  let distanceAway = dist(mX, mY, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;
}

function mousePressed() {
  for(let bubble of theBubbles) {
    if (clickedOnBubble(mouseX, mouseY, bubble)){
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      undertaker(mouseX, mouseY);
    }
  }
}
////

////spawning bubbles
function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: height + random(10, 60),
    dx: random(1, 10),
    radius: random(30, 100),
    r: random(100, 150),
    g: random(0, 100),
    b: random(150, 255),
    alpha: random(0, 255),
    timeX: random(10000000),
    timeY: random(10000000),
    deltaTime: 0.01,
  };
  theBubbles.push(someBubble);
}

function displayBubbles() {
  for(let bubble of theBubbles) {
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius);
  }
}
////

///////movement types
//not in use
function moveBubblesRandomly() {
  for(let bubble of theBubbles) {
    let choice = random(100);

    if(choice < 50) {
      //move up
      bubble.y -= bubble.dx;
    }

    else if(choice < 70) {
      //move down
      bubble.y += bubble.dx;
    }

    else if(choice < 85) {
      //move left
      bubble.x += bubble.dx;
    }

    else  {
      //move right
      bubble.x -= bubble.dx;
    }
  }
}

//in use
function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX)*width;
    bubble.y = noise(bubble.timeY)*height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}
//////

//Graves
function displayGraves() {
  for(let grave of deathArray) {
    textAlign(CENTER, CENTER);
    fill(255);
    text("X", grave.x, grave.y);
  }
}

function undertaker(theX, theY) {
  let grave = {
    x: theX,
    y: theY,
  };

  deathArray.push(grave);
}

function deleteGraves() {
  deathArray.shift();
}
