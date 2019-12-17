// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is where classes are defined
// 
// 12/30/1867

class MenuOptions {
  constructor(someTitle, somePicture, xPos, yPos, widthVal, heightVal, someFunction) {
    this.title = someTitle;
    this.icon = somePicture;

    this.x = xPos;
    this.y = yPos;
    
    this.width = widthVal;
    this.height = heightVal;
    this.action() = someFunction()
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
  
  move() {
    let atRightEdge;
    let atBottomEdge;
    let atLeftEdge = mapPos.x - floor(COLS/2) === 0;
    let atTopEdge = mapPos.y - floor(ROWS/2) === 0;
    let playerInXMiddle = round(this.x) === round(width/2);
    let playerInYMiddle = round(this.y) === round(height/2 - groundUnit.height/3.1);
    let playerXIndex;
    let playerYIndex; 

    if (insideBuilding) {
      atRightEdge = mapPos.x + floor(COLS/2) === currentBuilding.grid.length - 1;  
      atBottomEdge = mapPos.y + floor(ROWS/2) === currentBuilding.grid.length - 1;

      playerXIndex = floor(this.x/groundUnit.width);      
      playerYIndex = floor(this.y/groundUnit.height);
    }
    else {
      atRightEdge = mapPos.x + floor(COLS/2) === maps[currentMap].grid.length - 1;
      atBottomEdge = mapPos.y + floor(ROWS/2) === maps[currentMap].grid.length - 1;

      if (atRightEdge) {
        playerXIndex = (maps[currentMap].grid.length - COLS) + floor(this.x/groundUnit.width);
      }
      else if (atLeftEdge) {
        playerXIndex = floor(this.x/groundUnit.width);
      }
      else {
        playerXIndex = mapPos.x;
      }
  
      if (atBottomEdge) {
        playerYIndex = (maps[currentMap].grid.length - ROWS) + floor(this.y/groundUnit.height);
      }
      else if (atTopEdge) {
        playerYIndex = floor(this.y/groundUnit.height);
      }
      else {
        playerYIndex = mapPos.y;
      }
    }

    mainPlayerIndex.x = playerXIndex;
    mainPlayerIndex.y = playerYIndex;

    if (movingDown) {  
      if (insideBuilding && playerYIndex === currentBuilding.grid.length - 1 || playerYIndex === maps[currentMap].grid.length - 1) {
        if (insideBuilding) {
          if (playerXIndex === floor(currentBuilding.grid.length/2)) { 
            insideBuilding = false;
            
            mapPos.x = previousMapPos.x;
            mapPos.y = previousMapPos.y;
            this.x = previousPlayerPos.x;
            this.y = previousPlayerPos.y;
          }
        }
        else {
          currentMap--;
          this.y -= groundUnit.height * (ROWS - 1);
          mapPos.y = floor(ROWS/2);
        }
      }
      else if (walkable(playerXIndex, playerYIndex + 1)) {
        if (atBottomEdge || atTopEdge && !playerInYMiddle) {
          this.y += groundUnit.height;
        }
        else {
          mapPos.y++;
        }
      }
      movingDown = false;
    }
    else if (movingUp) {  
      if (playerYIndex === 0 && !insideBuilding) {
        if (currentMap < maps.length - 1) {
          if (canLeaveTown) {
            currentMap++;
            this.y += groundUnit.height * (ROWS - 1);
            mapPos.y = maps[currentMap].grid.length - round(ROWS/2);
          }
          else {
            talking = true;
            currentDirections = directions.left;
          }
        }
      }
      else if (walkable(playerXIndex, playerYIndex - 1)) {
        if (atTopEdge || atBottomEdge && !playerInYMiddle) {
          this.y -= groundUnit.height;
        }
        else {
          mapPos.y--;
        }
      }
      else if (maps[currentMap].grid[playerYIndex - 1][playerXIndex] === "^") {
        insideBuilding = true;
        currentBuilding = determineBuilding(playerXIndex, playerYIndex);

        previousMapPos.x = mapPos.x;
        previousMapPos.y = mapPos.y;
        previousPlayerPos.x = this.x;
        previousPlayerPos.y = this.y;

        mapPos.x = floor(COLS/2);
        mapPos.y = floor(ROWS/2);
        this.x = width/2;
        this.y = (height/2 - groundUnit.height/2.9) + groundUnit.height * floor(ROWS/2);
      }
      movingUp = false;
    }   
    else if (movingRight) {  
      if (walkable(playerXIndex + 1, playerYIndex)) {
        if (atRightEdge || atLeftEdge && !playerInXMiddle) {
          this.x += groundUnit.width;
        }
        else {
          mapPos.x++;
        }
      }
      movingRight = false;
    }
    else if (movingLeft) {  
      if (walkable(playerXIndex - 1, playerYIndex)) {
        if (atLeftEdge || atRightEdge && !playerInXMiddle) {
          this.x -= groundUnit.width;
        }  
        else {
          mapPos.x--;
        }  
      }  
      movingLeft = false;
    }
  }
}

class Pokebros {
  constructor(nameString, type, attackInt, defenseInt, speedInt, catchRateInt, spawnRateInt, movesetArray) {
    this.name = nameString;
    this.type = type;

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
        fill(tileColor(this.grid[i][j]));
        noStroke();
        rect(xPos * groundUnit.width, yPos * groundUnit.height, groundUnit.width + 2, groundUnit.height + 2);

        if (this.grid[i][j] === "@") {
          determineNPC(i, j).display(xPos * groundUnit.width, yPos * groundUnit.height);
        }
      }
    }
  }
}

class NPC {  
  constructor(nameString, pokebroArray, xIndex, yIndex, sprite) {
    this.name = nameString;
    this.pokebros = pokebroArray;

    this.xIndex = xIndex;
    this.yIndex = yIndex;

    this.sprite = sprite;
  }

  display(xPos, yPos) {
    image(this.sprite, xPos + groundUnit.width/2, yPos + groundUnit.height/6, groundUnit.width, groundUnit.width);
  }

  talk() {
    let dialogArray = returnDialog(this.name);
    
    textBox(dialogArray[textNum]);

    if (aPressed) {
      textNum++;
      aPressed = false;
    }

    if (textNum === dialogArray.length) {
      talking = false;
      textNum = 0;
    }
  }
}