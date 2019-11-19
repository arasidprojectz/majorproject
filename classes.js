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
  constructor(name, type, attack, defense, speed, catchRate, spawnRate, movesetArray) {
    this.name = name;
    this.type = type;

    this.attack = attack;
    this.defense = defense;
    this.speed = speed;

    this.catchRate = catchRate;
    this.spawnRate = spawnRate;

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

