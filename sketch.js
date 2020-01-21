// Major Project - Bromons
// Abrar Zaher and Nabeel Ramen
//
// This is main code
// 
// 12/30/1867

//input box for name
let inputBox;

//states
let mainState = 0;
let gameState = 0;
let currentMap = 0;
let textNum = 0;

//backgrounds
let introBg;

//background music/sound effects
let introMusic;

let changeState = true;

//characters
let mainPlayer;
let trumpPic;

let leMom;
let profBoi;
let wildZoneGuy;
let firstTownGuy;
let secondTownGuy;

let previousPlayerPos = {
  x: 0,
  y: 0
};

let mainPlayerIndex = {
  x: 0,
  y: 0
};

let facingPerson = false;
let talking = false;

//sprites
let prof;
let mainCharacterSprites;
let grass;

let maps = [];
let newMap = true;
let inZone = false;

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

let menuSelected = false;

let pokeballIcon;
let bagIcon;
let cardIcon;
let exitIcon;

let cursor = 0;

const COLS = 21;
const ROWS = 21;

let leCash = 500;
let badges = 0;

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

// states for the different options in battle 
let state = "menu";
let bromon;
let pokeName;

let enemy;
let enemyHealth;

let player;
let playerHealth;
let playerTurn;

let newBattle = false;

let battlingMechanicsDone = false;

function preload() {
  //backgrounds
  introBg = loadImage("assets/introbackground.PNG");

  //character sprites
  prof = [loadImage("assets/professor1.png"), loadImage("assets/professor1.png"), loadImage("assets/professor2.png"), loadImage("assets/professor1.png"), loadImage("assets/professor4.png")]; 
  mainCharacterSprites = [loadImage("assets/frontSprite.png"), loadImage("assets/backSprite.png"), loadImage("assets/rightSprite.png"), loadImage("assets/leftSprite.png")];
  trumpPic = loadImage("assets/trump.PNG");

  //map sprites
  grass = loadImage("assets/grass.png");

  //music
  introMusic = loadSound("assets/introMusic.mp3"); 

  //maps
  lilFlexTownTxt = loadStrings("maps/towns/lilFlexTown.txt");
  theRanchTxt = loadStrings("maps/towns/theRanch.txt");
  someCityTxt = loadStrings("maps/towns/someTown.txt");
  brotopolisTxt = loadStrings("maps/towns/brotopolis.txt");
  playerHouseTxt = loadStrings("maps/buildings/playerHouse.txt");
  labTxt = loadStrings("maps/buildings/lab.txt");
  zoneTxt = loadStrings("maps/towns/wildZone.txt");
  pkCenterTxt = loadStrings("maps/buildings/pkmnCenter.txt");

  //menu things
  pokeballIcon = loadImage("assets/pokeball.png");
  bagIcon = loadImage("assets/bag.png");
  cardIcon = loadImage("assets/card.png");
  exitIcon = loadImage("assets/exit.png");

  // //load sprites  i commented these out cuz loading take to long
  // bulbBack = loadImage('assets/bulbasaur_back.png');
  // bulbFront = loadImage('assets/bulbasaur_front.png'); // bulbasaur
  
  // zamaFront = loadImage('assets/zamazenta_front.png'); // zamazenta

  // pidgFront = loadImage('assets/pidgey_front.png'); // pidgey

  // ratFront = loadImage('assets/rattata_front.png'); // rattata

  // zubFront = loadImage('assets/zubat_front.png'); // zubat

  // fenBack = loadImage('assets/fennekin_back.png'); // fennekin
  // fenFront = loadImage('assets/fennekin_front.png');

  // mudBack = loadImage('assets/mudkip_back.png'); // mudkip
  // mudFront = loadImage('assets/mudkip_front.png');

  // munchFront = loadImage('assets/munchlax_front.png'); // munchlax

  // macFront = loadImage('assets/machop_front.png'); // machop

  // lapFront = loadImage('assets/lapras_front.png'); // lapras

  // arcaFront = loadImage('assets/arcanine_front.png'); // arcanine

  // beeFront = loadImage('assets/beedrill_front.png'); // beedrill

  // mukFront = loadImage('assets/muk_front.png'); // muk

  // onixFront = loadImage('assets/onix_front'); // onix
}

function setup() {
  createCanvas(3 * (windowWidth/5), (3 * (windowWidth/5))/1.6);

  groundUnit.width = width/COLS;
  groundUnit.height = height/ROWS;

  //map stuff
  lilFlexTownGrid = make2DArray(lilFlexTownTxt);
  theRanchGrid = make2DArray(theRanchTxt);
  someCityGrid = make2DArray(someCityTxt);
  brotopolisGrid = make2DArray(brotopolisTxt);
  playerHouseGrid = make2DArray(playerHouseTxt);
  labGrid = make2DArray(labTxt);
  pkGrid = make2DArray(pkCenterTxt);
  zoneGrid = make2DArray(zoneTxt);

  lilFlexTown = new Maps("Lil Flex Town", lilFlexTownGrid);  
  theRanch = new Maps("The Ranch", theRanchGrid);
  someCity = new Maps("Some City", someCityGrid);
  brotopolis = new Maps("Brotopolis", brotopolisGrid);

  maps = [lilFlexTown, theRanch, someCity, brotopolis];

  //buildings
  playerHouse = new Maps("Player's House", playerHouseGrid);
  lab = new Maps("Professor's Lab", labGrid);
  pokemonCenter = new Maps("Pokemon Center", pkGrid);
  pokeMart = new Maps("Pokemon Mart", pkGrid);
  gym = new Maps("Pokemon Gym", labGrid);

  currentBuilding = playerHouse;
  
  wildZone = new Maps("Wild Zone", zoneGrid);

  //Attacks
  tackle = new Attacks("Tackle", 5, 100);

  //Pokemons
  bulb = new Bromon("Bulbasaur", loadImage('assets/bulbasaur_front.png'), [tackle], 30, 10, 20, 5);
  fennekin = new Bromon("Fennekin", loadImage('assets/fennekin_front.png'), [tackle], 20, 30, 15, 5);
  mudkip = new Bromon("Mudkip", loadImage('assets/mudkip_front.png'), [tackle], 25, 20, 30, 5);
  
  //main character
  mainPlayer = new Character("Bro", mainCharacterSprites, [], width/2, height/2 - groundUnit.height/3.1); 

  //NPC
  firstTownGuy = new NPC("Joe", [], loadImage("assets/frontSprite.png"));
  secondTownGuy = new NPC("John", [], loadImage("assets/frontSprite.png"));
  leMom = new NPC("Mother", [], loadImage("assets/frontSprite.png"));
  profBoi = new NPC("Professor", [], loadImage("assets/frontSprite.png"));
  wildZoneGuy = new NPC("That Guy", [], loadImage("assets/frontSprite.png"));
  nurse = new NPC("Nurse", [], loadImage("assets/frontSprite.png"));
  clerk = new NPC("Clerk", [], loadImage("assets/frontSprite.png"));
  gymLeader1 = new NPC("Gym Leader 1", [bulb], loadImage("assets/frontSprite.png"));
  gymLeader2 = new NPC("Gym Leader 2", [fennekin], loadImage("assets/frontSprite.png"));
  gymLeader3 = new NPC("Gym Leader 3", [mudkip], loadImage("assets/frontSprite.png"));

}

function draw() {
  if (mainState === 0) {  
    gameIntro();
    menuOpen = false;
    aPressed = false;
    bPressed = false;
  } 
  else if (mainState === 1) {
    playGame();
  }
}

function playGame() {
  background(0); 

  if (gameState === 0) {  //moving around on regular map
    if (newMap || changeState) {
      //maps[currentMap].playMusic();
      newMap = false;
    }

    showMap();
    mainPlayer.display();

    if (menuOpen) {
      openMenu();
    }
    else if (talking) {
      determineNPC(mainPlayerIndex.y, mainPlayerIndex.x).talk();
    }
    else {
      mainPlayer.move();
    }

    if (aPressed && !menuOpen) {
      if (facingPerson) {
        talking = true;
      }
      aPressed = false;
    }

    if (xPressed && !talking) {
      menuOpen = !menuOpen;
      menuSelected = false;
      cursor = 0;
      xPressed = false;
    }
  }
  else if (gameState === 1) { //battle

    if (battlingMechanicsDone) {
      if (newBattle) {
        //stuff
        enemyHealth = enemy.health;
        playerTurn = mainPlayer.pokebro[0].speed > enemy.speed;

        newBattle = false;
      }
      
      if (enemyHealth > 0 && mainPlayer.bromonHealth > 0 && !run) {
        displayBackGround();
    
        // position of Bromon in battle
        rectMode(CENTER);
        //rect(1.4*(width/2), 1.07*(height/4), 250, 210); // enemy sprite
        //rect(0.45*(width/2), 1.21*(height/2), 250, 210); // your sprite
    
        // test sprites
        imageMode(CENTER);
        //image(img, 1.4*(width/2), 1.07*(height/4), 130, 100); // bulbasaur 
        //image(img2, 0.45*(width/2), 1.21*(height/2), 250, 195); // zamazenta

        if (playerTurn) {
      
          if (state === "menu") {
            fightOptionBorder();
            displayWords();
          }
          if (state === "bordermove") {
            bromonOptionBorder();
            displayWords();
          }
          if (state === "bordermove2") {
            itemOptionBorder();
            displayWords();
          }
          if (state === "bordermove4") {
            runOptionBorder();
            displayWords();
          }
          if (state === "insidebattle") {
            insideBattle();
          }
          if (state === "insidebromon") {
            insideBromon();
          }
          if (state === "insideitem") {
            insideItem();
          }
          if (playerHealth <= 0){
            gameOver();
          }

          playerTurn = false;
        }
        else {
          //enemy's turn

          playerTurn = true;
        }
      }
      else {
        if (enemyHealth < mainPlayer.bromonHealth) {
          //win
          let winDialog;

          if (inZone) {
            winDialog = ["Nice you won bro.", "Your " + mainPlayer.pokebro[0].name + " gained some experience."];
          }
          else {
            winDialog = ["Nice man, you defeated me.", "You knocked the guy out and stole some money."];
          }

          textBox(winDialog[textNum]);

          if (aPressed) {
            textNum++;
          }

          if (textNum === dialogArray.length) {
            talking = false;
            textNum = 0;
          }
        }
        else {
          //lose
        }
      }

    }
    else {
      textBox("u r supposed to be battling");

      if (aPressed) {
        gameState = 0;
        aPressed = false;
      }
    }
  }
}

function gameOver() {
  //return to pokemon center
}

function showMap() {
  if (insideBuilding) {
    currentBuilding.displayMap();
    displayCityName(currentBuilding);
  }
  else if (inZone) {
    wildZone.displayMap();
    displayCityName(wildZone);
  }
  else {
    maps[currentMap].displayMap();
    displayCityName(maps[currentMap]);
    imageMode(CENTER);
  }
}

function displayCityName(city) {
  fill(255);
  rect(0, 0, 100, 20);
  
  fill(0);
  textSize(10);
  text(city.name, 20, 5, 100, 10);
}

function openMenu() {
  let menuHeight = height * 0.9;
  let menuWidth = (width/4);
  let menuXPos = (3 * (width/4)) - 30;
  let menuYPos = height * 0.05;
  let selectionYPos = menuYPos + 60;

  let checkPokebros = new MenuOptions("Pokebros", pokeballIcon, menuXPos + 70, selectionYPos, menuWidth, menuHeight/4, displayPokebros);
  let checkBag = new MenuOptions("Bag", bagIcon, menuXPos + 70, selectionYPos + menuHeight/4, menuWidth, menuHeight/4, displayBag);
  let checkPlayerCard = new MenuOptions("Player Card", cardIcon, menuXPos + 70, selectionYPos + menuHeight/2, menuWidth, menuHeight/4, displayCard);
  let exit = new MenuOptions("Exit", exitIcon, menuXPos + 70, selectionYPos + 3 * (menuHeight/4), menuWidth, menuHeight/4, exitMenu);
  
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

  if (aPressed && !menuSelected) {
    menuSelected = true;
    aPressed = false;
  }

  if (bPressed) {
    if (menuSelected) {
      menuSelected = false;
    }
    else {
      menuOpen = false;
    }
    bPressed = false;
  }

  if (menuSelected) {
    mainMenuOptions[cursor].action();
  }
}

function exitMenu() {
  menuOpen = false;
  menuSelected = false;
}

//display the pokemons once the option is selected
function displayPokebros() {
  background(147, 176, 204);

  fill(70, 108, 145);
  noStroke();
  for (let x = width * 0.07; x < width * 0.7; x += ((width/2) * 0.9)) {
    for (let y = height * 0.075; y < height * 0.8; y += ((height/3) * 0.9)) {
      rect(x, y, (width/2) * 0.85, (height/3) * 0.75, 10);  //drawing out the rectangles in which the pokemons will be displayed
    }
  }
  if (canLeaveTown(lilFlexTown)) {
    showPokebros();
  }
}

//shows pokemon stats, eventually a class will be created for the pokemons which will make this simpler
function showPokebros() {
  noStroke();

  //displays pokemon sprite
  image(mainPlayer.pokebro[0].sprite, width * 0.15, height * 0.2, 100, 100);

  //displays name
  textSize(30);
  fill(0);
  text(mainPlayer.pokebro[0].name, width * 0.225, height * 0.15, 100, 30);

  //displays health
  textSize(10);
  text("HP", width * 0.225, height * 0.225, 30, 30);
  fill(100);
  rect(width * 0.25, height * 0.225, 150, 10);
  fill(255, 0, 0);
  rect(width * 0.25, height * 0.225, 150 * (mainPlayer.bromonHealth/mainPlayer.bromonHealth), 10);  //this length will be based off the current health once made
  fill(0);
  textSize(15)
  text(String(mainPlayer.bromonHealth) + "/" + String(mainPlayer.bromonHealth), width * 0.3, height * 0.255, 50, 40);  
}

//displays items in the bag once selected from menu
function displayBag() {
  background(147, 176, 204);
  noStroke();

  image(bagIcon, width/4, height/3, width/3, height/2);
  fill(92, 247, 165);
  rect(width * 0.45, height/12, width/2, height * 0.6, 10);
  fill(255);
  rect(width * 0.465, height * 0.1, width * 0.47, height * 0.565, 10); //player class will have an array of items which will be displayed here

  textBox("Your bag is empty.");  //this textbox will give brief info on the item
}

//displays player info once selected from menu
function displayCard() {
  background(147, 176, 204);
  noStroke();

  //creates a big "card" in which information will be displayed
  fill(210);
  rect(width * 0.05, height * 0.05, width * 0.9, height * 0.9, 10);
  fill(255, 125, 162);
  rect(width * 0.06, height * 0.06, width * 0.88, height * 0.88, 10);

  //"Trainer Card" title
  fill(0);
  textSize(50);
  text("Trainer Card", width * 0.15, height * 0.2, width * 0.6, height * 0.2);

  //displays info
  textSize(20);
  text("Name: " + mainPlayer.name, width * 0.2, height * 0.4, width * 0.6, height * 0.2);
  text("Money: $" + String(leCash), width * 0.2, height * 0.5, width * 0.6, height * 0.2); 
  text("Time Played: " + String(floor((millis()/1000) / 60)) + " min. " + String(floor((millis()/1000) % 60)) + " s.", width * 0.2, height * 0.6, height * 0.6, height * 0.2);

  //displays player icon
  image(trumpPic, width * 0.66, height * 0.55, 175, 300);
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
  image(prof[textNum], width/2, height/2, width/4, 5 * (height/8));
  
  if (textNum === 2) {
    noLoop(); 
    pickName();
  }

  if (textNum === 3) {
    textBox("Ah, yes, hello " + mainPlayer.name + "!");
  }
  else {
    textBox(introDialog[textNum]);
  }

  if (aPressed) {
    if (textNum === 4) {
      mainState++;
      introMusic.stop();
      changeState = true;
      textNum = 0;
    }
    else {
      textNum++;
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
    
  textNum++;
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
  stroke(0);
  strokeWeight(5);
  rect(width * 0.01, 3 * (height/4) - height * 0.01, width - width * 0.02, height/4, 20);

  noStroke();
  fill(0);
  textSize(20);
  text(theText, width * 0.05, 3 * (height/4) + height * 0.03, width - width * 0.05, height/4);
}

function walkable(xIndex, yIndex) {
  if (insideBuilding) {
    return currentBuilding.grid[yIndex][xIndex] === "#" || currentBuilding.grid[yIndex][xIndex] === "=";
  }
  else if (inZone) {
    return wildZone.grid[yIndex][xIndex] === "#" || wildZone.grid[yIndex][xIndex] === "$" || wildZone.grid[yIndex][xIndex] === "=";
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
    else if (xIndex === 19 && yIndex === 26) {
      return lab;
    }
  }
  else if (maps[currentMap] === theRanch) {
    if (xIndex === 24 && yIndex === 22) {
      return pokemonCenter;
    }
    else if (xIndex === 20 && yIndex === 22) {
      return pokeMart;
    }
    else if (xIndex === 13 && yIndex === 9) {
      return gym;
    }
  }
  else if (maps[currentMap] === someCity) {
    if (xIndex === 4 && yIndex === 9) {
      return pokemonCenter;
    }
    else if (xIndex === 4 && yIndex === 17) {
      return pokeMart;
    }
    else if (xIndex === 24 && yIndex === 22) {
      return gym;
    }
  }
  else if (maps[currentMap] === brotopolis) {
    if (xIndex === 23 && yIndex === 15) {
      return pokemonCenter;
    }
    else if (xIndex === 8 && yIndex === 15) {
      return pokeMart;
    }
    else if (xIndex === 16 && yIndex === 9 || xIndex === 15 && yIndex === 9) {
      return gym;
    }
  }
}

function tileColor(tileString) {  // yo check colors here https://www.quackit.com/css/css_color_codes.cfm
  if (tileString === "#" || tileString === "@") {
    if (insideBuilding) {
      return "#DEB887";
    } 
    else if (inZone) {
      return "#00FF00";
    }
    else {
      return "#F4A460";
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
  else if (tileString === "%") {
    return "#FF4500"
  }
  else if (tileString === "!") {
    return "#1E90FF"
  }
  else if (tileString === "]") {
    return "#A52A2A"
  }
  else if (tileString === "$") {
    return "#006400"
  }
  else if (tileString === "=") {
    if (inZone) {
      return "#F4A460";
    }
    else {
      return "#B22222"
    }
  }
}

function determineNPC() {
  if (inZone) {
    return wildZoneGuy;
  }
  else {
    if (maps[currentMap] === lilFlexTown) {
      if (insideBuilding) {
        if (currentBuilding === playerHouse) {
          return leMom;
        }
        else {
          return profBoi;
        }
      }
      else {
        return firstTownGuy;
      }
    }
    else if (maps[currentMap] === theRanch) {
      if (insideBuilding) {
        if (currentBuilding === pokemonCenter) {
          return nurse;
        }
        else if (currentBuilding === pokeMart) {
          return clerk;
        }
        else if (currentBuilding === gym) {
          return gymLeader1;
        }
      }
      else {
        return secondTownGuy;
      }
    }
    else if (maps[currentMap] === someCity) {
      if (insideBuilding) {
        if (currentBuilding === pokemonCenter) {
          return nurse;
        }
        else if (currentBuilding === pokeMart) {
          return clerk;
        }
        else if (currentBuilding === gym) {
          return gymLeader2;
        }
      }
    }
    else if (maps[currentMap] === brotopolis) {
      if (insideBuilding) {
        if (currentBuilding === pokemonCenter) {
          return nurse;
        }
        else if (currentBuilding === pokeMart) {
          return clerk;
        }
        else if (currentBuilding === gym) {
          return gymLeader3;
        }
      }
    }
  }
}

function returnDialog(name) {
  if (name === "Joe") {
    if (canLeaveTown(maps[currentMap])) {
      return ["Yo dawg, you new trainer right?", "That's cool bruh!", "Anyways enjoy your journey with your new pokebro!"];
    }
    else {
      return ["Yo bruv!!!", "Where do you think you're going with no pokebro!", "Go to the professor's lab at the south end of town and get yourself a pokebro!"];
    }
  }
  else if (name === "Mother") {
    return ["Boi watchu still doin in this house?", "If your still confused because your dumb then just remember to press X to open menu", "Get yourself a pokebro and get out of here!!!"];
  }
  else if (name === "Professor") {
    if (canLeaveTown(lilFlexTown)) {
      return ["Ok bro!", "You've got a pokebro!", "Now your goal is to go and get all 3 badges!"];
    }
    else {
      return ["Ah, hello, " + mainPlayer.name + ".", "I'm assuming you're here for a pokebro?", "Well here ya go!"]; // add the "you've obtained blah"
    }
  }
  else if (name === "John") {
    return ["Hey boss.", "Just in case you weren't aware or forgot, orange buildings are Pokemon Centers to heal up your bros, blue buildings are PokeMarts to buy items, and brown buildings are pokemon gyms where you can battle a strong trainer to get badges!"];
  }
  else if (name === "Nurse") {
    return ["Hello, welcome to the Pokemon Center.", "Your bro look tired, let me heal it up.", "Your bro should be fine now, have a nice day!"];
  }
  else if (name === "Clerk") {
    return ["Hello, welcome to the PokeMart", "I'm sorry but everything is out of stock right now"];
  }
  else if (name === "Gym Leader 1") {
    return ["Welcome to me gym.", "The Ranch's Gym", "Ples battle me."];
  }
  else if (name === "Gym Leader 2") {
    return ["Welcome to me gym.","The Gym in Some City", "Ples battle me."];
  }
  else if (name === "Gym Leader 3") {
    return ["Welcome to me gym.", "The strongest gym", "The Brotopolis Gym", "Ples battle me."];
  }
  else if (name === "Wild Zone") {
    return ["Welcome to le Wyld Zone, sir", "Go walk on the dark grass over there and u might encounter a random pokemon!"];
  }
}

function canLeaveTown(theTown) {
  // if (theTown === lilFlexTown) {
  //   return theTown === lilFlexTown && mainPlayer.pokebro.length > 0;
  // }
  // else if (theTown === theRanch) {
  //   reu
  // }
  return mainPlayer.pokebro.length > 0;
}

function displayBackGround() {
  // border at the bottom
  displayBattle();
  displayBattleStats();
}

function displayBattle() {
  // bottom display
  rectMode(CENTER);
  fill(255);
  strokeWeight(7);
  stroke("black");
  rect(width/2, 3.6*(height/4), width, height/5);
  
  if (state === "menu" || state === "bordermove" || state === "bordermove2" || 
      state === "bordermove3" || state === "bordermove4") {
    line(2*(width/3.1), 2*(height/2), 2*(width/3.1), 2*(height/2.5));
  }
}

function displayWords() {
  // fight button
  fill(0);
  stroke("black");
  textAlign(CENTER, CENTER);
  textSize(35);
  text("Fight", 3*(width/4), 1.73*(height/2));

  // bromon button
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(35);
  text("Bromon", 3.6*(width/4), 1.73*(height/2));

  // item button
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(35);
  text("Item", 2.98*(width/4), 1.9*(height/2)); 

  // run button
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(35);
  text("Run", 3.499*(width/4), 1.9*(height/2));
}

function fightOptionBorder() {
  noFill();
  stroke("red");
  strokeWeight(2);
  rect(3*(width/4), 1.73*(height/2), 100, 40, 10);
}

function bromonOptionBorder() {
  noFill();
  stroke("red");
  strokeWeight(2);
  rect(3.6*(width/4), 1.73*(height/2), 140, 40, 10);
}

function itemOptionBorder() {
  noFill();
  stroke("red");
  strokeWeight(2);
  rect(2.98*(width/4), 1.9*(height/2), 100, 40, 10);
}

function runOptionBorder() {
  noFill();
  stroke("red");
  strokeWeight(2);
  rect(3.499*(width/4), 1.9*(height/2), 100, 40, 10);
}

function insideBattle() {
  rectMode(CENTER);
  fill(255);
  strokeWeight(7);
  stroke("black");
  rect(width/2, 3.6*(height/4), width, height/5);
}

function insideBromon() {
  rectMode(CENTER);
  fill(255);
  strokeWeight(7);
  stroke("black");
  rect(width/2, 3.6*(height/4), width, height/5);
}

function insideItem() {
  rectMode(CENTER);
  fill(255);
  strokeWeight(7);
  stroke("black");
  rect(width/2, 3.6*(height/4), width, height/5);
}

function displayBattleStats() {
  // HP bars
  rectMode(CENTER);
  noFill();
  strokeWeight(2.3);
  stroke("black");
  rect(1.7*(width/2), 2.5*(height/4), 150, 13);
  rect(0.3*(width/2), 0.3*(height/2), 150, 13);

  textAlign(CENTER, CENTER);
  textSize(19);
  text("H P", 1.49*(width/2), 2.5*(height/4));
  text("H P", 0.09*(width/2), 0.3*(height/2));


  // Pokemon names
  //text("bromon", 1.6*(width/2), 2*(height/4));
  //text("bromon", 0.25*(width/2), 0.07*(height/2));
}