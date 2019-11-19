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
    if (movingDown) {
      this.y += groundUnit.height;
      movingDown = false;
    }
    else if (movingUp) {
      this.y -= groundUnit.height;
      movingUp = false;
    }   
    else if (movingRight) {
      this.x += groundUnit.width;
      movingRight = false;
    }
    else if (movingLeft) {
      this.x -= groundUnit.width;
      movingLeft = false;
    }    
  }
}

class Pokebros {
  constructor(nameString, aType, attackInt, defenseInt, speedInt, catchRateInt, spawnRateInt, movesetArray) {
    this.name = nameSring;
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
    for (let i = 0; i < this.grid[0].length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        
      }
    }
  }
}