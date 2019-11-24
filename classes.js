// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is where classes are defined
// 
// 12/30/1867

class MenuOptions {
  constructor(someTitle, somePicture, xPos, yPos, widthVal, heightVal) {
    this.title = someTitle;
    this.icon = somePicture;

    this.x = xPos;
    this.y = yPos;
    
    this.width = widthVal;
    this.height = heightVal;
  }

  display() {
    textSize(20);
    noStroke();
    text(this.title, this.x, this.y, this.width, this.height);
    image(this.icon, this.x - 30, this.y + 5, 30, 30);
  }

  highlight() {
    stroke(255, 0, 0);
    noFill();
    rect(this.x - 60, this.y - 20, this.width * 0.9, this.height/2, 10);
  }

  doTheThing() {
    console.log("sfdsf");
  }
}

class Character {
  constructor(theName, spriteArray, pokebroArray, x, y) {
    this.name = theName;
    
    this.sprite = spriteArray;

    this.pokebro = pokebroArray;

    this.x = x;
    this.y = y;
  }
  
  display() {
    image(this.sprite[currentDirections], this.x, this.y, groundUnit.width, groundUnit.width);
  }
  
  move() {  //will change
    let atRightEdge = mapPos.x + floor(COLS/2) === COLS;
    let atLeftEdge = mapPos.x - floor(COLS/2) === 0;
    let atTopEdge = mapPos.y + floor(ROWS/2) === ROWS;
    let atBottomEdge = mapPos.y - floor(ROWS/2) === 0;
    let playerInMiddle = playerPos.x === width/2 && playerPos.y === height/2 - groundUnit.height/3;

    if (movingDown) {
      if (atBottomEdge || atTopEdge) {
        this.y += groundUnit.height;
      }
      else {
        mapPos.y++;
        movingDown = false;
      }
    }
    else if (movingUp) {
      //this.y -= groundUnit.height;
      mapPos.y--;
      movingUp = false;
    }   
    else if (movingRight) {
      //this.x += groundUnit.width;
      mapPos.x++;
      movingRight = false;
    }
    else if (movingLeft) {
      //this.x -= groundUnit.width;
      mapPos.x--;
      movingLeft = false;
    }    
  }
}

class Pokebros {
  constructor(nameString, aType, attackInt, defenseInt, speedInt, catchRateInt, spawnRateInt, movesetArray) {
    this.name = nameString;
    this.type = aType;

    this.attack = attackInt;
    this.defense = defenseInt;
    this.speed = speedInt;

    this.catchRate = catchRateInt;
    this.spawnRate = spawnRateInt;

    this.moveset = movesetArray;
  }

  displayInBattle() {
    //yo boss
  }

  displayInParty() {
    //hello
  }

  useAttack(attackUsed) {
    
  }
}

class Towns {
  constructor(nameString, mapArray) {
    this.name = nameString;

    this.grid = mapArray;
  }

  displayMap() { 
    for (let j = mapPos.x - floor(COLS/2), xPos = 0; xPos < COLS; j++, xPos++) {
      for (let i = mapPos.y - floor(ROWS/2), yPos = 0; yPos < ROWS; i++, yPos++) {
        // fill(this.grid[i][j] * 255);
        //stroke(255);
        // rect(xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width, groundUnit.height);

        if (this.grid[i][j] === ".") {
          // imageMode(CORNER);
          // image(grass, xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width, groundUnit.height)
          fill(0, 255, 0);
          rect(xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width + 2, groundUnit.height + 2);
        } 
        else {
          if (this.grid[i][j] === "#") {
            fill(230, 158, 110);
          } 
          else {
            fill(0);
          }

          noStroke();
          rect(xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width + 2, groundUnit.height + 2);
        }
      }
    }
  }
}