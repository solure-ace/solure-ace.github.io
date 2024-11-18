//fireworks OOP DEMO

const NUMBER_OF_PARTICLES_PER_CLICK = 100;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = random(100, 255);
    this.g = random(0, 50);
    this.b = random(100, 255);
    this.a = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.size);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;
    //fade away over time
    this.a--;

  }

  isDead() {
    return this.a < 0;
  }

}


let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(10);
  for (let firework of theFireworks) {
    if (firework.isDead()) {
      //remove it
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }

    else {
      firework.update();
      firework.display();
    }
  }
}


function mousePressed() {
  for (let i = 0; i < NUMBER_OF_PARTICLES_PER_CLICK ; i ++){
    let someParticle = new Particle(mouseX, mouseY);
    theFireworks.push(someParticle);
  }
}