// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is where controls are defined
// 
// 12/30/1867

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (currentDirections === directions.up) {
            movingUp = true;
        }
        currentDirections = directions.up;
    }
    else if (keyCode === DOWN_ARROW) {
        if (currentDirections === directions.down) {
            movingDown = true;
        }
        currentDirections = directions.down;
    }
    else if (keyCode === RIGHT_ARROW) {
        if (currentDirections === directions.right) {
            movingRight = true;
        }
        currentDirections = directions.right;
    }
    else if (keyCode === LEFT_ARROW) {
        if (currentDirections === directions.left) {
            movingLeft = true;
        }
        currentDirections = directions.left;
    }
}