// Youtube: https://www.youtube.com/watch?v=qCBiKJbLcFI

// To do:
// BOOM - made the enemies blow up when they get hit
// BOOM - make a start screen
// BOOM - make a level 2
// BOOM - make level 1 --> level 2 noise
// BOOM - make level 2 have different enemies
// BOOM - make the bullets die when they get half way down the ship
// BOOM - make level 3
// BOOM - level 3 bullets are blue
// BOOM? - get player shoot sounds back
// BOOM - add a function to reset all variables in the case of gameover
// BOOM - on the game over screen, allow hitting space bar to start over
// BOOM - when you win then start over, set didWIn back to false
// - give the player the choice of ship
// - alter shooting speed basedoff the ship chosen
// - make bullets above halfway up the screen disappear when you reach new level
// - add text on the screen to indicate level up (LEVEL 3 - YOUR END)

import EnemyController from "/src/enemyController.js";
import Player from "/src/player.js";
import BulletController from "/src/bulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_STATE = {
  STARTSCREEN: 0,
  RUNNING: 1,
  GAMEOVER: 2
};
let gameState = GAME_STATE.STARTSCREEN;
let current_level = 1;
let shipNum = 1;

let isGameOver = false;
let didWin = false;

canvas.width = 600;
canvas.height = 625;

const background = new Image();
background.src = "/src/images/pixel_stars.jpg";

const ship1 = new Image();
ship1.src = "/src/images/pixel_ship_1.png";
const ship2 = new Image();
ship2.src = "/src/images/pixel_ship_2.png";
const ship3 = new Image();
ship3.src = "/src/images/pixel_ship_3.png";

const gameStartAudio = new Audio("src/audio/computerNoise_000.ogg");
gameStartAudio.volume = 0.022;
const levelUpSound = new Audio("/src/audio/level-up.wav");
levelUpSound.volume = 0.35;
const playerWinSound = new Audio("/src/audio/small-win.wav");
playerWinSound.volume = 0.25;
const playerDeathSound = new Audio("/src/audio/fast-game-over.wav");
playerDeathSound.volume = 0.15;

// event listener arrow function
let startGame = (event) => {
  if (
    event.code === "Space" ||
    event.code === "Digit1" ||
    event.code === "Digit2" ||
    event.code === "Digit3"
  ) {
    if (gameState === GAME_STATE.STARTSCREEN || isGameOver) {
      if (event.code === "Digit2") {
        shipNum = 2;
        player = new Player(canvas, 18, playerBulletController, shipNum);
      }
      if (event.code === "Digit3") {
        shipNum = 3;
        player = new Player(canvas, 18, playerBulletController, shipNum);
      }
      // if you lost, reset everything
      if (isGameOver) {
        resetAllVariables();
      }
      gameState = GAME_STATE.RUNNING;
      gameStartAudio.play();
    }
  }
};

document.addEventListener("keydown", startGame);

// important variables
let playerBulletController = new BulletController(
  canvas,
  15,
  "#9df716",
  "player",
  current_level
);
let enemyBulletController = new BulletController(
  canvas,
  4,
  "red",
  "enemy",
  current_level
);

let enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
  current_level
);

let player = new Player(canvas, 18, playerBulletController, shipNum);

// game loop
function game() {
  if (gameState === GAME_STATE.STARTSCREEN) {
    showStartScreen(ctx);
  }
  if (gameState === GAME_STATE.RUNNING) {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
      enemyController.draw(ctx);
      player.draw(ctx);
      playerBulletController.draw(ctx);
      enemyBulletController.draw(ctx);
    }
  }
}

function resetAllVariables() {
  current_level = 1;
  isGameOver = false;
  didWin = false;

  playerBulletController = new BulletController(
    canvas,
    15,
    "#9df716",
    "player",
    current_level
  );
  enemyBulletController = new BulletController(
    canvas,
    4,
    "red",
    "enemy",
    current_level
  );

  enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController,
    current_level
  );
  player = new Player(canvas, 18, playerBulletController, shipNum);
}

function showStartScreen(ctx) {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(ship1, 95, canvas.height - 157, 75, 75);
  ctx.drawImage(ship2, 265, canvas.height - 160, 75, 75);
  ctx.drawImage(ship3, 430, canvas.height - 160, 75, 75);

  const text1 = "Welcome to";
  ctx.fillStyle = "white";
  ctx.font = "42px Courier New";
  ctx.fillText(text1, 170, canvas.height / 6);
  ctx.font = "56px Courier New";
  const text1b = "Alien Invaders";
  ctx.fillText(text1b, 60, canvas.height / 3.5);

  ctx.font = "20px Courier New";
  const text2 = "by Davis Ulrich";
  ctx.fillText(text2, canvas.width / 3, canvas.height / 2.3);
  ctx.font = "14px Courier New";
  const text3 = "6/16/22";
  ctx.fillText(text3, canvas.width / 2.35, canvas.height / 2 - 10);

  ctx.font = "bold 24px Courier New";
  const text4 = "Select your ship:";
  ctx.fillText(text4, canvas.width / 3.4, canvas.height / 2 + 70);

  ctx.font = "20px Courier New";
  const text5 = "Press 1:";
  ctx.fillText(text5, canvas.width / 7, canvas.height / 1.42);
  const text6 = "Press 2:";
  ctx.fillText(text6, canvas.width / 2.35, canvas.height / 1.42);
  const text7 = "Press 3:";
  ctx.fillText(text7, (3 * canvas.width) / 4 - 30, canvas.height / 1.42);

  ctx.font = "17px Courier New";
  const text8 = '"Starship"';
  ctx.fillText(text8, canvas.width / 7 - 5, canvas.height / 1.08);
  const text9 = '"Frog-Zap"';
  ctx.fillText(text9, canvas.width / 2.36, canvas.height / 1.08);
  const text10 = '"Houdini"';
  ctx.fillText(text10, (3 * canvas.width) / 4 - 26, canvas.height / 1.08);
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }
  if (
    enemyBulletController.collideWith(player) ||
    enemyController.collideWith(player)
  ) {
    isGameOver = true;
    playerDeathSound.play();
  }
  if (enemyController.enemyRows.length === 0) {
    if (current_level === 1) {
      current_level = 2;
      levelUpSound.play();
      enemyController = new EnemyController(
        canvas,
        enemyBulletController,
        playerBulletController,
        current_level
      );
      return;
    } else if (current_level === 2) {
      current_level = 3;
      levelUpSound.play();
      enemyController = new EnemyController(
        canvas,
        enemyBulletController,
        playerBulletController,
        current_level
      );
      return;
    } else if (current_level === 3) {
      didWin = true;
      isGameOver = true;
      playerWinSound.play();
    }
  }
}

function displayGameOver() {
  if (isGameOver) {
    // you won!
    if (didWin) {
      let text = "You Won!";
      ctx.fillStyle = "white";
      ctx.font = "70px Courier New";
      ctx.fillText(text, canvas.width / 4, canvas.height / 2.2);

      let text2 = "Press Space Bar to Restart";
      ctx.font = "20px Courier New";
      ctx.fillText(text2, canvas.width / 4, (3 * canvas.height) / 5);
    }
    // you lost :(
    else {
      let text = "Game Over!";
      ctx.fillStyle = "white";
      ctx.font = "70px Courier New";
      ctx.fillText(text, canvas.width / 6, canvas.height / 2.2);

      let text2 = "Press Space Bar to Restart";
      ctx.font = "20px Courier New";
      ctx.fillText(text2, canvas.width / 4, (3 * canvas.height) / 5);
    }
  }
}

setInterval(game, 1000 / 20);