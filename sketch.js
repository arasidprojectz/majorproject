// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is main code
// 
// 12/30/1867

//input box for name
let inputBox;

//states
let state = 1;
let gameState = 0;
let currentMap = 0;
let introTextNum = 0;

//backgrounds
let introBg;

//background music/sound effects
let introMusic;

let changeState = true;

//characters
let mainPlayer;  

let previousPlayerPos = {
  x: 0,
  y: 0
};

let facingPerson = false;

//sprites
let prof;
let mainCharacterSprites;
let grass;

let maps = [];
let newMap = false;

let currentBuilding;
let insideBuilding = false;

//buttons
let aPressed = false;
let bPressed = false;
let xPressed = false;
let inputButton;

let movingUp = false;
let movingDown = false;
let movingRight = false;
let movingLeft = false;

let menuOpen = false;

let pokeballIcon;
let bagIcon;
let cardIcon;
let exitIcon;

let cursor = 0;

const COLS = 21;
const ROWS = 21;

let mapPos = {
  x: 14,
  y: 16
};

let previousMapPos = {
  x: 0,
  y: 0
};

let groundUnit = {
  width: 0,
  height: 0
};

let directions = {
  down: 0,
  up: 1,
  right: 2,
  left: 3
};

let currentDirections = directions.down;

function preload() {
  //backgrounds
  introBg = loadImage("assets/introbackground.PNG");

  //character sprites
  prof = [loadImage("assets/professor1.png"), loadImage("assets/professor1.png"), loadImage("assets/professor2.png"), loadImage("assets/professor1.png"), loadImage("assets/professor4.png")]; 
  mainCharacterSprites = [loadImage("assets/frontSprite.png"), loadImage("assets/backSprite.png"), loadImage("assets/rightSprite.png"), loadImage("assets/leftSprite.png")];
  
  //map sprites
  grass = loadImage("assets/grass.png");

  //music
  introMusic = loadSound("assets/introMusic.mp3"); 

  //maps
  lilFlexTownTxt = loadStrings("maps/towns/lilFlexTown.txt");
  theRanchTxt = loadStrings("maps/towns/theRanch.txt");
  playerHouseTxt = loadStrings("maps/buildings/playerHouse.txt");

  //menu things
  pokeballIcon = loadImage("assets/pokeball.png");
  bagIcon = loadImage("assets/bag.png");
  cardIcon = loadImage("assets/card.png");
  exitIcon = loadImage("assets/exit.png");
}

function setup() {
  createCanvas(3 * (windowWidth/5), (3 * (windowWidth/5))/1.6);

  groundUnit.width = width/COLS;
  groundUnit.height = height/ROWS;

  lilFlexTownGrid = make2DArray(lilFlexTownTxt);
  theRanchGrid = make2DArray(theRanchTxt);
  playerHouseGrid = make2DArray(playerHouseTxt);

  lilFlexTown = new Towns("Lil Flex Town", lilFlexTownGrid);
  theRanch = new Towns("The Ranch", theRanchGrid);

  maps = [lilFlexTown, theRanch];

  playerHouse = new Towns("Player's House", playerHouseGrid);  //buildings class here
  
  mainPlayer = new Character("Bro", mainCharacterSprites, [], width/2, height/2 - groundUnit.height/3.1);
}

function draw() {
  if (state === 0) {  
    gameIntro();
  } 
  else if (state === 1) {
    playGame();
  }
}

function playGame() {
  background(0); 

  // if (newMap || changeState) {
  //   maps[currentMap].playMusic();
  // }

  if (gameState === 0) {  //moving around on a map
    if (insideBuilding) {
      currentBuilding.displayMap();
    }
    else {
      maps[currentMap].displayMap();
      imageMode(CENTER);
    }
    mainPlayer.display();
    
    if (menuOpen) {
      openMenu();
    }
    else {
      mainPlayer.move();
    }

    if (aPressed && !menuOpen) {
      //talking
    }

    if (xPressed) {
      menuOpen = !menuOpen;
      cursor = 0;
      xPressed = false;
    }
  }
  else if (gameState === 1) {
    //battle tings
    console.log("sfdsfdsfdsfdsfsf");
  }
}

function openMenu() {
  let menuHeight = height * 0.9;
  let menuWidth = (width/4);
  let menuXPos = (3 * (width/4)) - 30;
  let menuYPos = height * 0.05;
  let selectionYPos = menuYPos + 60;  

  let checkPokebros = new MenuOptions("Pokebros", pokeballIcon, menuXPos + 70, selectionYPos, menuWidth, menuHeight/4);
  let checkBag = new MenuOptions("Bag", bagIcon, menuXPos + 70, selectionYPos + menuHeight/4, menuWidth, menuHeight/4);
  let checkPlayerCard = new MenuOptions("Player Card", cardIcon, menuXPos + 70, selectionYPos + menuHeight/2, menuWidth, menuHeight/4);
  let exit = new MenuOptions("Exit", exitIcon, menuXPos + 70, selectionYPos + 3 * (menuHeight/4), menuWidth, menuHeight/4);
  
  let mainMenuOptions = [checkPokebros, checkBag, checkPlayerCard, exit]; 

  stroke(210);
  rect(menuXPos, menuYPos, menuWidth, menuHeight, 10);
  stroke(0, 200, 255); 
  strokeWeight(5);
  fill(255);
  rect(menuXPos + 2, menuYPos + 2, menuWidth - 4, menuHeight - 4, 10);
  
  fill(0);
  for (let i = 0; i < mainMenuOptions.length; i++) {
    mainMenuOptions[i].display();  
  }
  
  //cursor limitations
  if (cursor > 3) {
    cursor = 0;
  }
  else if (cursor < 0) {
    cursor = 3;
  }
  
  mainMenuOptions[cursor].highlight(); 

  if (aPressed) {
    //mainMenuOptions[cursor].doTheThing();
    aPressed = false;
  }
}

function gameIntro() {
  let introDialog = ["Welcome to the monde de Bromon!!! (Press spacebar to continue)", "I am Songru Tom, the world's leading researcher in the field of flexology.", "Oh, I'm sorry, but what was your name again???", "placeholder", "Well, your journey to becoming the greatest flexer of the century begins now!"];
  
  if (changeState) {
    introMusic.play();
    changeState = false;
  }
  
  imageMode(CORNER);
  background(introBg);
  imageMode(CENTER);
  image(prof[introTextNum], width/2, height/2, width/4, 5 * (height/8));
  
  if (introTextNum === 2) {
    noLoop(); 
    pickName();
  }

  if (introTextNum === 3) {
    textBox("Ah, yes, hello " + mainPlayer.name + "!");
  }
  else {
    textBox(introDialog[introTextNum]);
  }

  if (aPressed) {
    if (introTextNum === 4) {
      state++;
      introMusic.stop();
      changeState = true;
    }
    else {
      introTextNum++;
    }
    aPressed = false;
  }
}

function pickName() {  // remember to format input box
  inputBox = createInput('');
  inputBox.position(width/4 + (inputBox.width * 0.8), 4 * (height/5));

  inputButton = createButton('Submit');
  inputButton.position(inputBox.x + inputBox.width, 4 * (height/5));
  inputButton.mousePressed(setPlayerName);

  greeting = createElement('h2', 'What is your name?');
  greeting.position(width/4 + (inputBox.width * 0.8), 4 * (height/5) - 50);
  
  rect(width/5, 4 * (height/5), 20, 20); // border
  //fill(51, 255, 255);

  textSize(50);
}

function setPlayerName() {
  mainPlayer.name = inputBox.value();

  inputBox.remove();
  inputButton.remove();
  greeting.remove();
    
  introTextNum++;
  loop(); 
}

function make2DArray(textFile) {
  let theArray = [];

  for (let i = 0; i < textFile.length; i++) {
    theArray.push([]);
    for (let j = 0; j < textFile.length; j++) {
      theArray[i].push(textFile[i][j]);
    }
  }

  return theArray;
}

function textBox(theText) {
  fill(255);
  rect(width * 0.01, 3 * (height/4) - height * 0.01, width - width * 0.02, height/4, 20);
  
  fill(0);
  textSize(20);
  text(theText, width * 0.05, 3 * (height/4) + height * 0.03, width - width * 0.05, height/4)
  strokeWeight(4);
}

function walkable(xIndex, yIndex) {
  if (insideBuilding) {
    return currentBuilding.grid[yIndex][xIndex] === "#" || currentBuilding.grid[yIndex][xIndex] === "$";
  }
  else {
    return maps[currentMap].grid[yIndex][xIndex] === "#" || maps[currentMap].grid[yIndex][xIndex] === "$";
  }
}

function determineBuilding(xIndex, yIndex) {
  if (maps[currentMap] === lilFlexTown) {
    if (xIndex === 6 && yIndex === 14) {
      return playerHouse;
    }
  }
}

function tileColor(tileString) {  // yo check colors here https://www.quackit.com/css/css_color_codes.cfm
  if (tileString === "#" || tileString === "@") {
    if (insideBuilding) {
      return "#FFFAF0";
    } 
    else {
      return "#F4A460"
    }
  }
  else if (tileString === ".") {
    return "#00FF00";
  }
  else if (tileString === "*") {
    return "#000000";
  }
  else if (tileString === "^") {
    return "#FFFFFF"
  }
}