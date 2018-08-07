// Random int generator from w3School: https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Enemies our player must avoid
var Enemy = function(x, y, baseSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.baseSpeed = baseSpeed
    this.speed = baseSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 500){
      this.x = -100;
      this.speedShift();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Change speed of the enemy on screen
Enemy.prototype.speedShift = function() {
  this.speed = getRndInteger(Math.floor(0.8 * this.baseSpeed), Math.floor(1.2 * this.baseSpeed));
  console.log(this.speed);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
  if (this.x < 0){
    this.x = 0;
  }

  if (this.x > 410){
    this.x = 410;
  }

  if (this.y < 0){
    this.y = 0;
  }

  if (this.y > 400){
    this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  console.log(this.x, this.y);
  switch(keyPress){
    case 'left':
      this.x -= this.speed;
      break;
    case 'right':
      this.x += this.speed;
      break;
    case 'up':
      this.y -= this.speed -20;
      break;
    case 'down':
      this.y += this.speed -20;
      break;
  }
};


// Now instantiate your objects.
let enemy = new Enemy (-100, getRndInteger(50, 200), getRndInteger(80, 100));

// Place all enemy objects in an array called allEnemies
const allEnemies = [];

allEnemies.push(enemy);
// Place the player object in a variable called player

const player = new Player(202.5, 383, 100);
let level = 1;
let score = 0;
let lives = 3;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
