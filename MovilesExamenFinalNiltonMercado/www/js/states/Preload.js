Preload = function (game) {};

Preload.prototype = {
  preload: function () {
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    console.log("Empieza a cargar los assets");

    this.game.load.image("bg","assets/bg_layer4_.png");
    this.game.load.image("floor","assets/floor/choco.png");

    
    this.game.load.image("red1","assets/red/spikeMan_jump.png");
    this.game.load.image("red2","assets/red/springMan_stand.png");

    
    this.game.load.image("yellow1","assets/yellow/flyMan_fly.png");
    this.game.load.image("yellow2","assets/yellow/sun1.png");
    this.game.load.image("yellow3","assets/yellow/wingMan1.png");


    this.game.load.image("fly1","assets/fly/shipBeige_manned.png");
    this.game.load.image("fly2","assets/fly/shipBlue_manned.png");
    this.game.load.image("fly3","assets/fly/shipGreen_manned.png");
    this.game.load.image("fly4","assets/fly/shipPink_manned.png");
    this.game.load.image("fly5","assets/fly/shipYellow_manned.png");


    this.game.load.image("brown1","assets/brown/duck_outline_brown.png");
    this.game.load.image("brown2","assets/brown/duck_outline_target_brown.png");
    this.game.load.image("brown3","assets/brown/duck_white.png");

   
    this.game.load.image("cream1","assets/cream/creamChoco.png");
    this.game.load.image("cream2","assets/cream/creamMocca.png");
    this.game.load.image("cream3","assets/cream/creamPink.png");

   

    this.game.load.spritesheet("player","assets/dude.png",32,48,9);
    
    this.game.load.image("bullet_brown","assets/bullets/brown.png");
    this.game.load.image("bullet_cream","assets/bullets/cream.png");
    this.game.load.image("bullet_fly","assets/bullets/fly.png");
    this.game.load.image("bullet_red","assets/bullets/red.png");
    this.game.load.image("bullet_yellow","assets/bullets/yellow.png");

  },
  create: function () {
    console.log("Assets cargados correctamente");
    this.state.start("Menu");
  },
};
