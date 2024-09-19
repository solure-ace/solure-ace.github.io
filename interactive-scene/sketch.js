// Interactive scene
// Avery Walker
// September 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(255*2, 255*2);
}


// use html to show typed str =+ key w/ char limit, + button to clear it make text colour match the ball colour
//somewhere to use nested loops?, maybe change something about the shape in every corner more ''while'' its in that corner,+size + size min, -size w/ size min, shapecircle, shape triangle

let borderSize = 20
let size = 100

function draw() {
  background(0);
  
  noStroke();
  
  
  //white / middle
   if (mouseX === width/2 && mouseY === height/2) {
    fill(255, 255, 255);
    circle(mouseX, mouseY, size);
  }
  
   //blue / top left corner
  else if(mouseX <= width/2 && mouseY <= height/2){
    fill(120, 150, 250);
    circle(mouseX, mouseY, size);
  }
  
  //red / bottom right corner
  else if (mouseX >= width/2 && mouseY >= height/2) {
    fill(225, 100, 100);
    circle(mouseX, mouseY, size);
  }
  
  //purple / bottom left corner
  else if (mouseX <= width/2 && mouseY >= height/2) {
    fill(180, 80, 180);
    circle(mouseX, mouseY, size);
  }
  
  //green / top right corner
  else if (mouseX >= width/2 && mouseY <= height/2){
    fill(100, 210, 150);
    circle(mouseX, mouseY, size);
  }
}

//resizes it with a border
function windowResized() {
  resizeCanvas(windowWidth-borderSize, windowHeight-borderSize);
}