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
    bPressed = true;  
  }
  else if (key === "x") {
    xPressed = true;
  }
} 

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    if (gameState === 0) {
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
    if (gameState === 0) {
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
            facingPerson = currentBuilding.grid[mainPlayerIndex.y - 1][mainPlayerIndex.x] === "@";
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
    if (gameState === 0) {
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
    if (gameState === 0) {
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