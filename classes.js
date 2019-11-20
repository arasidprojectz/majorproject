// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is where classes are defined
// 
// 12/30/1867

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
    let atMapEdge = mapPos.x - floor(COLS/2)

    if (movingDown) {
      //this.y += groundUnit.height;
      mapPos.y++;
      movingDown = false;
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
    for (let i = mapPos.x - floor(COLS/2), xPos = 0; xPos < COLS; i++, xPos++) {
      for (let j = mapPos.y - floor(ROWS/2), yPos = 0; yPos < ROWS; j++, yPos++) {
        fill(this.grid[i][j] * 255);
        stroke(255);

        rect(xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width, groundUnit.height);
      }
    }
  }
}