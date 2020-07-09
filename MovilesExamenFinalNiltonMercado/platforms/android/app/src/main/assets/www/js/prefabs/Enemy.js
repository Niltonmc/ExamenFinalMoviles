Enemy = function (game, x, y, currentWave) {
    this.currentWave = currentWave;
    this.game = game;
    this.GetEnemyKey();
    Phaser.Sprite.call(this, game, x, y, this.key);
    this.anchor.setTo(0.5);

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {

    if (this.position.x < 0 && this.position.x > 800 && this.position.y < 0 && this.position.y > 600) {
        this.kill();
    }
}

Enemy.prototype.GetEnemyKey = function () {

    this.enemyType = "red";

    let rand = this.game.rnd.integerInRange(1, 5);
    let randYellow = this.game.rnd.integerInRange(1, 3);
    let randRed = this.game.rnd.integerInRange(1, 2);
    let randFly = this.game.rnd.integerInRange(1, 5);
    let randCream = this.game.rnd.integerInRange(1, 3);
    let randBrown = this.game.rnd.integerInRange(1, 3);

    if (this.currentWave == 1) {
        this.enemyType = "red";
        this.key = this.enemyType + randRed;

    } else if (this.currentWave == 2) {
        if (rand == 1) {
            this.enemyType = "red";
            this.key = this.enemyType + randRed;
        } else {
            this.enemyType = "yellow";
            this.key = this.enemyType + randYellow;
        }

    } else if (this.currentWave == 3) {
        if (rand == 1) {
            this.enemyType = "red";
            this.key = this.enemyType + randRed;

        } else if (rand == 2) {
            this.enemyType = "yellow";
            this.key = this.enemyType + randYellow;
        } else {
            this.enemyType = "fly";
            this.key = this.enemyType + randFly;
        }

    } else if (this.currentWave == 4) {
        if (rand == 1) {
            this.enemyType = "red";
            this.key = this.enemyType + randRed;
        } else if (rand == 2) {
            this.enemyType = "yellow";
            this.key = this.enemyType + randYellow;

        } else if (rand == 3) {
            this.enemyType = "fly";
            this.key = this.enemyType + randFly;
        } else {
            this.enemyType = "cream";
            this.key = this.enemyType + randCream;
        }
        
    } else {
        if (rand == 1) {
            this.enemyType = "red";
            this.key = this.enemyType + randRed;
        } else if (rand == 2) {
            this.enemyType = "yellow";
            this.key = this.enemyType + randYellow;
        } else if (rand == 3) {
            this.enemyType = "fly";
            this.key = this.enemyType + randFly;
        } else if (rand == 4) {
            this.enemyType = "cream";
            this.key = this.enemyType + randCream;
        } else {
            this.enemyType = "brown";
            this.key = this.enemyType + randBrown;
        }
    }
}

Enemy.prototype.MoveEnemy = function (x, y, direction) {

    if (this.enemyType == "red" || this.enemyType == "yellow") {

        let temp = this.game.rnd.integerInRange(0, 1);
        this.y = 500;
        if (temp == 1) {
            this.x = -5;
            this.body.velocity.x = 100;
        } else {
            this.x = 795;
            this.body.velocity.x = -100;
        }
    } else if (this.enemyType == "cream") {
        let randx = this.game.rnd.integerInRange(10, 800);
        this.x = randx;
        this.y = 10
        this.body.velocity.y = 100;
    } else if (this.enemyType == "fly") {
        let temp = this.game.rnd.integerInRange(0, 1);
        this.y = 500;
        this.x = 250;
        if (temp == 1) {
            this.body.velocity.x = 100;
        } else {
            this.body.velocity.x = -100;
        }
    } else {
        let randx = this.game.rnd.integerInRange(10, 800);
        this.x = randx;
        this.y = 610;
        this.body.velocity.y = -100;
    }
}
Enemy.prototype.reset = function (x, y, direction) {
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.MoveEnemy();
}
