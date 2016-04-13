// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    checkCollision(this);
    if (this.x >= 505) {
        this.x = 0
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Health = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/heart.png';

};
Health.prototype.update = function(dt) {
    checkCollisionWithHealth(this);

};
Health.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 130);
};

var HealthScore = function(x,y) {                   /* Create HealthPoint subclass for the Health Superclass*/
    Health.call(this,x,y);                          /* This would take all methods and properties from 'Health'*/
};                                                  /* and add a new method for a unique kind of rendering*/
HealthScore.prototype = Object.create(Health.prototype);

HealthScore.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 25, 45);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'left') { 
        player.x -= player.speed;  
        }
    if (keyPressed == 'up') {
        player.y -= player.speed - 4.5;
        }
    if (keyPressed == 'right') { 
        player.x += player.speed;
        }
    if (keyPressed == 'down') { 
        player.y += player.speed - 4.5;
    }
    console.log('keyPress is: ' + keyPressed);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202.5,383,25.25);
var enemy1 = new Enemy(0,(Math.random() * (230 - 50) + 50), 20);
allEnemies = new Array;
allEnemies.push(enemy1);
// adding healths
allHealth = new Array;

// adding healthPoints for the bottom menu
var allHealthPoints = new Array;
var healthPoint = new HealthScore(202.5, 580);
allHealthPoints.push(healthPoint);
var healthCounter = 2;

var checkCollision = function (anyEnemy) {
    if (
        player.x + 75 <= anyEnemy.x + 135 &&
        player.y + 103 >= anyEnemy.y + 75 &&
        player.x + 135 >= anyEnemy.x + 75 &&
        player.y + 78 <= anyEnemy.y + 110) 
    {
        player.x = 202.5;
        player.y = 383;

        allHealthPoints.pop();
        healthCounter -= 1;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 590, 500, 100);
//If player lost his game, the rendering process wouls stop
//EventListener need to be removed, and should be added a new 'Enter'
//listener to make player able to back to main menu

        if (healthCounter == 0) {
            gameStarted = false;
            gamesPlayed += 1;
            ctx.drawImage(Resources.get('images/game-over.png'), 7, 200,490,150);
            gameOver = true;

        }
        
    };
    if (player.y <= 25) {
        player.x = 202.5;
        player.y = 383;



        var enemy = new Enemy(0,(Math.random() * (230 - 50) + 50), allEnemies.length*50);
        allEnemies.push(enemy);
        allHealth.length = 0;
        if (allEnemies.length%3 == 0) {
            var health = new Health(Math.random() * ((400 - 0) + 0), Math.floor(Math.random() * (300 - 120 + 1)) + 120)
            allHealth.push(health);
        };

    };
    if (player.y >= 383) {
        player.y = 383
    };
    if (player.x >= 402.5) {
        player.x = 402.5
    };
    if (player.x <= 0) {
        player.x = 0
    };
};
var checkCollisionWithHealth = function (anyHealth) {
    if (
        player.y + 80 >= anyHealth.y
        && player.y <= anyHealth.y 
        && player.x + 80 >= anyHealth.x
        && player.x - 50<= anyHealth.x) {
        allHealth.length = 0;
            if (allHealthPoints.length <= 2) {
                if (allHealthPoints.length == 0) {
                var healthPoint = new HealthScore(202.5, 580);
                };
                if (allHealthPoints.length == 1) {
                var healthPoint = new HealthScore(202.5+40, 580);
                };
                if (allHealthPoints.length == 2) {
                var healthPoint = new HealthScore(202.5+80, 580);
                };
            };
        allHealthPoints.push(healthPoint);
        healthCounter += 1;
        
    };

};



// function to reset the game is player lost or choose 'new game option'
var resetCurrentGame = function() {
    allEnemies.length = 0;
    var enemy1 = new Enemy(0,(Math.random() * (230 - 50) + 50), 20);
    allEnemies.push(enemy1);

    player.x = 202.5;
    player.y = 383;

    allHealthPoints.length = 0;
    var healthPoint = new HealthScore(202.5, 580);
    allHealthPoints.push(healthPoint);
    healthCounter = 2;


}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
