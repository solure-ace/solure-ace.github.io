// Walker oop demo

class Walker {
  constructor(x, y, theColour) { 
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.radius = 4;
    this.colour = theColour;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
  move() {
    let choice = random(100);
    if (choice < 25 ) { 
      //up
      this.y -= this.speed;
    }
    else if (choice < 50 ) { 
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else if (choice < 100) {
      //right
      this.x += this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  background(50);
  createCanvas(windowWidth, windowHeight);
  let luc = new Walker(width/2, height/2, "lavender");
  walkerArray.push(luc);
}

function draw() {
  for (let theWalker of walkerArray) {
    theWalker.move();
    theWalker.display();
  }
}

function mousePressed() {
  let someColour = color(random(255),random(255),random(255));
  let someWalker = new Walker(mouseX, mouseY, someColour);
  walkerArray.push(someWalker);
}
