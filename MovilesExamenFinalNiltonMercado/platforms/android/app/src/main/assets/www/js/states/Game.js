Game = function () { }

Game.prototype = {
    init: function (currentWave, maxNumbEnemies, _score) {

        this.PLAYER_SPEED = 300;
        this.BULLET_SPEED = 500;

        if (_score == null) {
            _score = 0;
        }

        this.currentScore = _score;
        this.totalEnemiesNumb = 0;
        this.elapsedTime = 0;
        this.seconds = 1000;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;

        this.currentPlayerDirection = 1;

        this.currentWave = currentWave || 1;
        this.maxNumbEnemies = maxNumbEnemies * 2 || 4;
        this.currentEnemyNumb = 0;

        this.currenTimeShoot = 0
        this.timeToShoot = 1000

        if (this.currentWave == 1) {
            this.waveFrequencySeconds = 8;
        } else if (this.currentWave == 2) {
            this.waveFrequencySeconds = 6;
        } else if (this.currentWave == 3) {
            this.waveFrequencySeconds = 4;
        } else if (this.currentWave == 4) {
            this.waveFrequencySeconds = 3;
        } else {
            this.waveFrequencySeconds = 2;
            this.maxNumbEnemies = 64;
        }
    },

    create: function () {

        console.log("Se cargó exitosamente la escena juego");

        this.CreateBG();
        this.CreatePlayer();
        this.CreateFloor();
        this.CreateHUD();
        this.CreateBulletsGroup();
        this.CreateEnemiesGroup();
    },

    CreateBG: function () {
        this.bg = this.game.add.sprite(0, 0, "bg");
        this.bg.anchor.setTo(0.5, 0.5);
        this.bg.scale.setTo(0.5, 0.5);
        this.bg.x = this.world.centerX
        this.bg.y = this.world.centerY
    },

    CreatePlayer: function () {
        this.player = this.game.add.sprite(this.game.world.centerX / 2, 500, "player", 4);
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.physics.arcade.gravity.y = 1000;
        this.game.physics.arcade.enable(this.player);
        this.SetPlayerMovement();
        this.player.animations.add("left", [0, 1, 2, 3], 10, false);
        this.player.animations.add("right", [5, 6, 7, 8], 10, false);

        this.live = localStorage.lives;
    },

    SetPlayerMovement: function () {
        this.keys = this.input.keyboard.createCursorKeys();

        this.spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    CreateFloor: function () {
        this.floor = this.game.add.tileSprite(0, 0, this.game.world.width, 70, "floor");
        this.floor.y = this.game.world.height - this.floor.height;
        this.floor.autoScroll(-30, 0);
        this.physics.arcade.enable(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
    },

    CreateHUD: function () {

        this.textLive = this.game.add.text(100, 50, "Lives: " + this.live, {
            fontSize: '40px', fill: '#000000'
        });
        this.textLive.anchor.setTo(0.5, 0.5);

        this.textWave = this.game.add.text(350, 50, "Wave: " + this.currentWave, {
            fontSize: '40px', fill: '#000000'
        });
        this.textWave.anchor.setTo(0.5, 0.5);

        this.textScore = this.game.add.text(600, 50, "Score: " + this.currentScore, {
            fontSize: '40px', fill: '#000000'
        });
        this.textScore.anchor.setTo(0.5, 0.5);
    },

    CreateBulletsGroup: function () {
        this.playerBullets = this.game.add.group();
        this.playerBullets.enableBody = true;

    },

    CreateEnemiesGroup: function () {
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
    },

    update: function () {

        this.MovePlayer();

        this.currenTimeShoot += this.game.time.elapsed;
        if (this.currenTimeShoot >= this.timeToShoot) {
            this.Shoot();
        }

        this.LoadWave(this.waveFrequencySeconds);

        this.physics.arcade.collide(this.player, this.floor);

        localStorage.totalscore = this.currentScore;

        this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.CheckDestroyEnemy, null, this);
        this.game.physics.arcade.collide(this.player, this.enemies, this.ReduceLive, null, this);

        this.textLive.setText("Lives: " + this.live);
        this.textScore.setText("Score: " + this.currentScore);
        this.textWave.setText("Wave: " + this.currentWave);

    },

    ReduceLive: function (player, enemy) {
        enemy.kill();
        this.live--;

        if (this.live <= 0) {
            this.game.state.start("Gameover");
        }
    },

    CheckDestroyEnemy: function (bullet, enemy) {

        if (bullet.bulletType == enemy.enemyType) {
            if (enemy.enemyType == "brown") {
                this.currentScore = this.currentScore + 5;
            } else if (enemy.enemyType == "red") {
                this.currentScore = this.currentScore + 10;
            } else if (enemy.enemyType == "yellow") {
                this.currentScore = this.currentScore + 15;
            } else if (enemy.enemyType == "cream") {
                this.currentScore = this.currentScore + 20;
            } else {
                this.currentScore = this.currentScore + 50;
            }
            enemy.kill();
        }

        bullet.kill();
    },

    MovePlayer: function () {

        this.player.body.velocity.x = 0;

        if (this.keys.left.isDown) {
            this.player.body.velocity.x = -this.PLAYER_SPEED;
            this.player.play("left");
            this.currentPlayerDirection = -1;
        }

        if (this.keys.right.isDown) {
            this.player.body.velocity.x = this.PLAYER_SPEED;
            this.player.play("right");
            this.currentPlayerDirection = 1;
        }

        this.keys.up.onDown.add(this.Jump, this);
    },

    Shoot: function () {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.currenTimeShoot = 0;
            this.CreatePlayerBullets("brown");
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.currenTimeShoot = 0;
            this.CreatePlayerBullets("cream");
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.currenTimeShoot = 0;
            this.CreatePlayerBullets("fly");
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
            this.currenTimeShoot = 0;
            this.CreatePlayerBullets("red");
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
            this.currenTimeShoot = 0;
            this.CreatePlayerBullets("yellow");
        }

    },


    CreatePlayerBullets: function (_typeBullet) {
        console.log(_typeBullet);
        let bullet = this.playerBullets.getFirstDead();

        if (!bullet) {
            bullet = new PlayerBullet(this.game, this.player.x, this.player.y, _typeBullet);
        } else {
            bullet.reset(this.player.x, this.player.y, _typeBullet);
        }
        this.playerBullets.add(bullet);

        bullet.body.allowGravity = false;


        bullet.body.velocity.x = this.BULLET_SPEED * this.currentPlayerDirection;
    },

    Jump: function () {

        if (this.player.body.touching.down) {
            this.player.body.velocity.y = -500;
        }
    },

    LoadWave: function (freq) {

        let time_wave = this.seconds * this.waveFrequencySeconds * this.maxNumbEnemies
        let time_add = this.seconds * this.waveFrequencySeconds;

        this.endOfLevelTimer = this.game.time.events.add(time_wave + time_add, function () {
            this.currentWave++;
            this.game.state.start("Game", true, false, this.currentWave, this.maxNumbEnemies, this.currentScore);
        }, this);

        this.elapsedTime += this.time.elapsed;

        if (this.elapsedTime >= this.seconds * freq) {
            if (this.currentEnemyNumb < this.maxNumbEnemies) {
                this.elapsedTime = 0;
                this.CreateEnemy(0, 0, this.currentWave);
                this.currentEnemyNumb++;
            }
        }
    },

    CreateEnemy: function (x, y, wave) {
        let enemy = this.enemies.getFirstDead();
        if (!enemy) {
            enemy = new Enemy(this.game, x, y, wave);
            this.enemies.add(enemy);
        }
        enemy.body.allowGravity = false;
        enemy.reset(x, y);
    }
}