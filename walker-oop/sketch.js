// Walker oop demo

class Walker {
  constructor(x, y, theColour) { // winheight
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.radius = 7;
    this.colour = theColour;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }
  move() {
    let choice = random(100);
    if (choice < 25 ) { //&& this.y > 1
      //up
      this.y -= this.speed;
    }
    else if (choice < 50 ) { //this.y < windheight
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else if (choice < 100) {
      //right
      this.y -= this.speed;
    }
  }
}

let luc;
let micheal;

function setup() {
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width/2, height/2, "lavender", height);
  micheal = new Walker(width/2, height/2, "lightgreen", height);
}

function draw() {
  // background(40);
  luc.move();
  luc.display();

  micheal.move();
  micheal.display();
}
