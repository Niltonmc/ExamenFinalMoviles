Game = function () { }

Game.prototype = {
    init: function (currentWave, maxNumbEnemies, _score) {

        this.PLAYER_SPEED = 300;
        this.BULLET_SPEED = 500;

        if (_score == null) {
            _score = 0;
        }

        this.currentScore = _score;
        this.total_enemies = 0;
        this.elapsedTime = 0;
        this.seconds = 1000;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;

        this.currentBulletDirection = 1;
        this.currentPlayerDirection = 1;

        this.currentWave = currentWave || 4;
        this.maxNumbEnemies = maxNumbEnemies * 2 || 4;
        this.enemy_count = 0;

        this.typeBullet = null
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

        /*
        this.keyCodeA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keyCodeS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keyCodeD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keyCodeF = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.keyCodeG = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
        */

        //this.q_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
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
        //this.Shoot();

        this.currenTimeShoot += this.game.time.elapsed;
        if (this.currenTimeShoot >= this.timeToShoot) {
            this.Shoot();
            //this.generateSun();
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

        if (bullet.bulletType == enemy.type_enemy) {
            if (enemy.type_enemy == "brown") {
                this.currentScore = this.currentScore + 5;
            } else if (enemy.type_enemy == "red") {
                this.currentScore = this.currentScore + 10;
            } else if (enemy.type_enemy == "yellow") {
                this.currentScore = this.currentScore + 15;
            } else if (enemy.type_enemy == "cream") {
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
        /*
        this.typeBullet = "";
        if(this.keyCodeA.isDown){
            this.typeBullet = "brown";
            //this.keyCodeA.onDown.add(this.CreatePlayerBullets,this,{param1: 10});

            //console.log("Oprime A")
        }

        if(this.keyCodeS.isDown){
            this.typeBullet = "cream";
            //this.keyCodeS.onDown.add(this.CreatePlayerBullets,this);

        }

         if(this.keyCodeD.isDown){
            this.typeBullet = "fly";
            //this.keyCodeD.onDown.add(this.CreatePlayerBullets,this);

        }

         if(this.keyCodeF.isDown){
            this.typeBullet = "red";
            //this.keyCodeF.onDown.add(this.CreatePlayerBullets,this);

        }

         if(this.keyCodeG.isDown){
            this.typeBullet = "yellow";
           // this.keyCodeG.onDown.add(this.CreatePlayerBullets,this);

        }
        */

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

        //this.keyCodeA.onDown.add(this.CreateA,this);

        /*
        this.keyCodeA.onDown.add(this.CreatePlayerBullets,this);
        this.keyCodeS.onDown.add(this.CreatePlayerBullets,this);
        this.keyCodeD.onDown.add(this.CreatePlayerBullets,this);
        this.keyCodeF.onDown.add(this.CreatePlayerBullets,this);
        this.keyCodeG.onDown.add(this.CreatePlayerBullets,this);
*/


        //this.q_key.onDown.add(this.ChangeDirection,this);
    },

    CreateA: function () {
        this.typeBullet = "brown";
        console.log(this.typeBullet);
        let bullet = this.playerBullets.getFirstDead();

        if (!bullet) {
            bullet = new PlayerBullet(this.game, this.player.x, this.player.y, this.typeBullet);
        } else {
            bullet.reset(this.player.x, this.player.y, this.typeBullet);
        }
        this.playerBullets.add(bullet);

        bullet.body.allowGravity = false;


        bullet.body.velocity.x = this.BULLET_SPEED * this.currentPlayerDirection;
    },

    CreatePlayerBullets: function (_typeBullet) {
        console.log(_typeBullet);
        //console.log(this.typeBullet)
        //console.log(this.param1)
        let bullet = this.playerBullets.getFirstDead();

        if (!bullet) {
            //console.log(_typeBullet)
            bullet = new PlayerBullet(this.game, this.player.x, this.player.y, _typeBullet);
        } else {
            bullet.reset(this.player.x, this.player.y, _typeBullet);
        }
        this.playerBullets.add(bullet);

        bullet.body.allowGravity = false;


        bullet.body.velocity.x = this.BULLET_SPEED * this.currentPlayerDirection;

        /*
        if (this.currentBulletDirection == 1) {
            bullet.body.velocity.y = -this.BULLET_SPEED;
        }else if (this.currentBulletDirection == -1){
            if (this.currentPlayerDirection == 1) {
                bullet.body.velocity.x = this.BULLET_SPEED;
            }else{
                bullet.body.velocity.x = -this.BULLET_SPEED;
            }
        }
        */
    },

    ChangeDirection: function () {
        this.currentBulletDirection *= -1;
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
            if (this.enemy_count < this.maxNumbEnemies) {
                this.elapsedTime = 0;
                this.CreateEnemy(0, 0, this.currentWave);
                this.enemy_count++;
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