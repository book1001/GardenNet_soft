let penSize = 5;
let penState = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(penSize);
}

function draw() {
  if (mouseIsPressed) {
    if (penState == 0) {
      // line(mouseX-5, mouseY, pmouseX+5, pmouseY);
	    line(mouseX, mouseY, pmouseX, pmouseY);
      // line(mouseX+5, mouseY+5, pmouseX+5, pmouseY+5);
    } 
    
    if (penState == 1) {
	    ellipse(mouseX, mouseY, 10, 10);
    }
    
    if (penState == 2) {
      line(mouseX-5, mouseY-5, mouseX+5, mouseY+5);
      line(mouseX+5, mouseY-5, mouseX-5, mouseY+5);
    }
  }
}

function keyTyped() {
  // if (key == 'c') {
  //   background(255);
  // }

  if (keyIsDown(81)) { //Q
    background(255);
  }

  if (keyIsDown(49)) { //1
    stroke("#000000");
  }

  if (keyIsDown(50)) { //2
    stroke("#f595f3");
  }

  if (keyIsDown(51)) { //3
    stroke(0, 0, 255);
  }

  // if (key == 'x') {
  //   // x style pen
  //   penState = 2;
  // }
  
  // if (key == 'e') {
  //   // circle pen
  //   penState = 1;
  // }
  
  // if (key == 'l') {
  //   // connected lines
  //   penState = 0;
  // }
}

function keyPressed() {
  if (keyIsDown(52) && penSize > 1) { //4
    penSize -= 1;
  }
  
  if (keyIsDown(53)) { //5
		penSize += 1;
  }

	// if (keyCode == LEFT_ARROW && penSize > 1) {
  //   penSize -= 1;
  // }
  
  // if (keyCode == RIGHT_ARROW) {
	// 	penSize += 1;
  // }
    
  strokeWeight(penSize);
}
      

      
      
      
      
      