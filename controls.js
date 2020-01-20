// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is where controls are defined
// 
// 12/30/1867

function keyTyped() {
  if (key ===" ") {
    aPressed = true;
  }
  else if (key === "b") {
    if (gameState === 1) {
      if (state === "insidebattle") {
        state = "menu";
      }
    }
    else {
      bPressed = true;  
    }
  }
  else if (key === "x") {
    xPressed = true;
  }
} 

function keyPressed() {
  if (gameState === 1) {
    if (keyCode === RIGHT_ARROW && state === "menu") {
      state = "bordermove";
    }
    if (keyCode === LEFT_ARROW && state === "bordermove") {
      state = "menu";
    }
    if (keyCode === DOWN_ARROW && state === "menu") {
      state = "bordermove2";
    }
    if (keyCode === UP_ARROW  && state === "bordermove2") {
      state = "menu";
    }
    if (keyCode === DOWN_ARROW && state === "bordermove") {
      state = "bordermove4";
    }
    if (keyCode === UP_ARROW && state === "bordermove4") {
      state = "bordermove";
    }
    if (keyCode === LEFT_ARROW && state === "bordermove4") {
      state = "bordermove2";
    }
    if (keyCode === RIGHT_ARROW && state === "bordermove2") {
      state = "bordermove4";
    }
    if (key === " " && state === "menu") {
      state = "insidebattle";
    }
    if (key === " " && state === "bordermove") {
      state = "insidebattle";
    }
    if (key === " " && state === "bordermove2") {
      state = "insidebattle";
    }
    if (key === " " && state === "bordermove4") {
      // return to overworld/cannot run if against trainer  btw reuring to overworld just set gameState to 0
    }
  }
  else if (gameState === 0) {
    if (keyCode === DOWN_ARROW) {
      if (!talking) {
        if (menuOpen) {
          cursor++;
        }
        else {
          if (currentDirections === directions.down) {
            movingDown = true;
          }
          currentDirections = directions.down;
          if (insideBuilding) {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== currentBuilding.grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== currentBuilding.grid.length) {
              facingPerson = currentBuilding.grid[mainPlayerIndex.y + 1][mainPlayerIndex.x] === "@";
            }
          }
          else {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== maps[currentMap].grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== maps[currentMap].grid.length) {
              facingPerson = maps[currentMap].grid[mainPlayerIndex.y + 1][mainPlayerIndex.x] === "@";
            }
          }
        }
      }
    } 
    else if (keyCode === UP_ARROW) {
      if (!talking) {
        if (menuOpen) {
          cursor--;
        }
        else {
          if (currentDirections === directions.up) {
            movingUp = true;
          }
          currentDirections = directions.up;
          if (insideBuilding) {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== currentBuilding.grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== currentBuilding.grid.length) {
              if (currentBuilding === pokemonCenter || currentBuilding === pokeMart) {   
                facingPerson = currentBuilding.grid[mainPlayerIndex.y - 2][mainPlayerIndex.x] === "@";
              } 
              else {
                facingPerson = currentBuilding.grid[mainPlayerIndex.y - 1][mainPlayerIndex.x] === "@";
              }
            }
          }
          else {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== maps[currentMap].grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== maps[currentMap].grid.length) {
              facingPerson = maps[currentMap].grid[mainPlayerIndex.y - 1][mainPlayerIndex.x] === "@";
            }
          }
        }
      }
    }
    else if (keyCode === RIGHT_ARROW) {
      if (!talking) {
        if (!menuOpen) {
          if (currentDirections === directions.right) {
            movingRight = true;
          }
          currentDirections = directions.right;
          if (insideBuilding) {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== currentBuilding.grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== currentBuilding.grid.length) {
              facingPerson = currentBuilding.grid[mainPlayerIndex.y][mainPlayerIndex.x + 1] === "@";
            }
          }
          else {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== maps[currentMap].grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== maps[currentMap].grid.length) {
              facingPerson = maps[currentMap].grid[mainPlayerIndex.y][mainPlayerIndex.x + 1] === "@";
            }
          }
        }      
      }
    }
    else if (keyCode === LEFT_ARROW) {
      if (!talking) {
        if (!menuOpen) {
          if (currentDirections === directions.left) {
            movingLeft = true;
          }
          currentDirections = directions.left;
          if (insideBuilding) {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== currentBuilding.grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== currentBuilding.grid.length) {
              facingPerson = currentBuilding.grid[mainPlayerIndex.y][mainPlayerIndex.x - 1] === "@";
            }
          }
          else {
            if (mainPlayerIndex.x !== 0 || mainPlayerIndex.x !== maps[currentMap].grid.length || mainPlayerIndex.y !== 0 || mainPlayerIndex.y !== maps[currentMap].grid.length) {
              facingPerson = maps[currentMap].grid[mainPlayerIndex.y][mainPlayerIndex.x - 1] === "@";
            }
          }
        }
      }
    }
  }
}