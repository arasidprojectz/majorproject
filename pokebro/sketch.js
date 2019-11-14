// Interactive Scene (Part of Major Project)
// Abrar Zaher
// 25/09/19
//
// Extra for Experts:
// - background music
// - "created"/photoshopped my own sprites (except the main character sprites)

//input box for name
let inputBox;

//states
let state = 0;
/*
  0 = intro;
  more to be added later
*/
let introTextNum = 0;

//backgrounds
let introBg;

//background music/sound effects
let introMusic;

//characters
let playerName;  //going to make class for players as game development progresses

//sprites
let prof;
let maleCharacterSprite;
let femaleCharacterSprite;

//dialog
let IntroDialog = ["Welcome to the monde de Pokebro!!! Press spacebar to continue.", "I am Songru Tom, the world's leading researcher in the field of flexology.", "Oh, I'm sorry but what was your name again???", "placeholder", "Wait... are you a boy or a girl???", "Oh right, my bad, anyways, your journey to becoming the greatest flexer of the century begins now!"];

//buttons
let aPressed = false;
let bPressed = false;
let inputButton;

function preload() {
  introBg = loadImage("assets/introbackground.PNG");
  prof = [loadImage("assets/professor1.PNG"), loadImage("assets/professor1.PNG"), loadImage("assets/professor2.PNG"), loadImage("assets/professor1.PNG"), loadImage("assets/professor3.PNG"), loadImage("assets/professor4.PNG")]; //professor sprite from https://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/
  introMusic = loadSound("assets/introMusic.mp3"); //music from youtube (https://www.youtube.com/watch?v=1RRGInmOhTQ)
  maleCharacterSprite = loadImage("assets/maleTestSprite.png");
  femaleCharacterSprite = loadImage("assets/femaleTestSprite.png"); //both male and female sprites from https://www.pngtube.com/viewm/TbRJb_female-and-male-stick-figure/
}

function setup() {
  createCanvas(3 * (windowWidth/5), (3 * (windowWidth/5))/1.6);
  background(0);
  introMusic.play();
}

//loops through specific parts of the game using state variables, more will be added
function draw() {
  if (state === 0) {
    gameIntro();
  } 
  else if (state === 1) {
    background(0);
  }
}

//intro scene for final project
function gameIntro() {
  //loads background image and professor sprite
  background(introBg);
  image(prof[introTextNum], width/3, height/6, width/4, 5 * (height/8));
  
  //checks for specific states of the intro that have other functions to go through
  if (introTextNum === 6) {
    state = 1;
    introMusic.stop();
  }
  else if (introTextNum === 2) {
    noLoop(); //loop ended to allow user to input name
    pickName();
  }
  else if (introTextNum === 4) {
    pickSprite();
  }

  //loads textbox with dialog based of intro state, needed specific one for 3 as it complicated the variable assignment when in array
  if (introTextNum === 3) {
    textBox("Ah, yes, hello " + playerName + "!");
  }
  else {
    textBox(IntroDialog[introTextNum]);
  }

  //advances game when space bar is pressed
  if (aPressed) {
    introTextNum++;
    aPressed = false;
  }
}

function pickSprite() {
  //I will add actual sprites for these, did not find the time for this assignment
  image(maleCharacterSprite, width/6, height/8, width/6, height/2);
  image(femaleCharacterSprite, 7 * (width/12), height/8, width/6, height/2);

  //checks if mouse hovering over sprite
  if (mouseX <= width/6 + width/6 && mouseX >= width/6 && mouseY >= height/8 && mouseY <= height/8 + height/2) {
    if (mouseIsPressed) {
      introTextNum++;
      //once I make an actual sprite and class for characters I will set the specific sprite for the character here
    }
    else {
      image(maleCharacterSprite, width/6, height/8, width/6 * 1.1, height/2 * 1.1);
    }
  }
  else if (mouseX <= 7 * (width/12) + width/6 && mouseX >= 7 * (width/12) && mouseY >= height/8 && mouseY <= height/8 + height/2) {
    if (mouseIsPressed) {
      introTextNum++;
      //once I make an actual sprite and class for characters I will set the specific sprite for the character here
    }
    else {
      image(femaleCharacterSprite, 7 * (width/12), height/8, width/6 * 1.1, height/2 * 1.1);
    }
  }
}

//created input box for player name
function pickName() {
  inputBox = createInput('');
  inputBox.position(width/2 + (inputBox.width * 0.8), 2 * (height/3));

  inputButton = createButton('Submit');
  inputButton.position(inputBox.x + inputBox.width, 2 * (height/3));
  inputButton.mousePressed(setPlayerName);

  greeting = createElement('h2', 'What is your name?');
  greeting.position(width/2 + (inputBox.width * 0.8), 2 * (height/3) - 50);

  textSize(50);
}

//removes input stuff, eventually the input value will be assigned for the main character in a character class
function setPlayerName() {
  playerName = inputBox.value();

  inputBox.remove();
  inputButton.remove();
  greeting.remove();
  
  introTextNum++;
  loop(); //loop restarted to continue game
}

//a function that takes in the text that will be displayed and shows it at the bottom like an authentic pokemon game
function textBox(theText) {
  fill(255);
  rect(width * 0.01, 3 * (height/4) - height * 0.01, width - width * 0.02, height/4, 20);
  
  fill(0);
  textSize(20);
  text(theText, width * 0.05, 3 * (height/4) + height * 0.03, width - width * 0.05, height/4)
}

//checks if specific keys are pressed, more will be added
function keyPressed() {
  if (key ===" ") {
    aPressed = true;
  }
} 