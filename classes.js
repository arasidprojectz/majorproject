// Major Project - Bromons
// This is where classes are defined
// Abrar Zaher and Nabeel Ramen
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
    image(this.sprite[currentDirections], this.x, this.y, unit * 2, unit * 2);
  }
  
  move() {  //will change
    if (movingDown) {
      this.y += unit;
      movingDown = false;
    }
    else if (movingUp) {
      this.y -= unit;
      movingUp = false;
    }   
    else if (movingRight) {
      this.x += unit;
      movingRight = false;
    }
    else if (movingLeft) {
      this.x -= unit;
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

