Enemy = function(game,x,y,wave){
    this.wave = wave;
    this.game = game;
    this.get_key();
    Phaser.Sprite.call(this,game,x,y,this.key);
    this.anchor.setTo(0.5);
    
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
    if (this.position.x < 0 && this.position.x > 800 &&this.position.y <0 && this.position.y >600) {
        this.kill();
    }
}
Enemy.prototype.get_key = function(){
    this.type_enemy = "red";
    let rand = this.game.rnd.integerInRange(1,5);
    let randYellow =this.game.rnd.integerInRange(1,3);
    let randRed =this.game.rnd.integerInRange(1,2);
    let randFly =this.game.rnd.integerInRange(1,5);
    let randCream =this.game.rnd.integerInRange(1,3);
    let randBrown =this.game.rnd.integerInRange(1,3);
    if(this.wave == 1){
        this.type_enemy = "red";
        this.key = this.type_enemy+randRed;
    }else if(this.wave == 2){
        if(rand == 1){
            this.type_enemy = "red";
            this.key = this.type_enemy+randRed;
        }else{
            this.type_enemy = "yellow";
            this.key = this.type_enemy+randYellow;
        }
    }else if(this.wave == 3){
        if(rand ==1){
            this.type_enemy = "red";
            this.key = this.type_enemy+randRed;
            
        }else if(rand == 2){
            this.type_enemy = "yellow";
            this.key = this.type_enemy+randYellow;
        }else{
            this.type_enemy = "fly";
            this.key = this.type_enemy+randFly;
        }
    }else if(this.wave == 4){
        if(rand == 1){
            this.type_enemy = "red";
            this.key = this.type_enemy+randRed;
        }else if(rand ==2){
            this.type_enemy = "yellow";
            this.key = this.type_enemy+randYellow;
            
        }else if(rand ==3){
            this.type_enemy = "fly";
            this.key = this.type_enemy+randFly;
        }else{
            this.type_enemy = "cream";
            this.key = this.type_enemy+randCream;
        }
    }else{
        if(rand==1){
            this.type_enemy = "red";
            this.key = this.type_enemy+randRed;
        }else if(rand==2){
            this.type_enemy = "yellow";
            this.key = this.type_enemy+randYellow;
        }else if(rand==3){
            this.type_enemy = "fly";
            this.key = this.type_enemy+randFly;
        }else if(rand==4){
            this.type_enemy = "cream";
            this.key = this.type_enemy+randCream;
        }else{
            this.type_enemy = "brown";
            this.key = this.type_enemy+randBrown;
        }
    }
}
Enemy.prototype.damage = function(type){

}
Enemy.prototype.movement = function(x,y,direction){
    // Phaser.Sprite.prototype.reset.call(this,x,y);
    // this.body.velocity.x = 100 * direction;   
    // console.log(this.type_enemy);
    if (this.type_enemy == "red" || this.type_enemy == "yellow") {

        let temp = this.game.rnd.integerInRange(0,1);
        this.y = 500;
        if(temp == 1){
            this.x = -5;
            this.body.velocity.x = 100;
        }else{
            this.x = 795;
            this.body.velocity.x = -100;
        }
    }else if(this.type_enemy == "cream"){
        let randx = this.game.rnd.integerInRange(10,800);
        this.x = randx;
        this.y = 10
        this.body.velocity.y = 100; //arriba hacia abajo
    }else if(this.type_enemy == "fly"){
        let temp = this.game.rnd.integerInRange(0,1);
        this.y = 500;
        this.x = 250;
        if(temp == 1){
            this.body.velocity.x = 100;
        }else{
            this.body.velocity.x = -100;
        }
    }else{
        let randx = this.game.rnd.integerInRange(10,800);
        this.x = randx;
        this.y = 610;
        this.body.velocity.y = -100; //abajo hacia arriba
    }
}
Enemy.prototype.reset = function(x,y,direction){
    Phaser.Sprite.prototype.reset.call(this,x,y);
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);
    this.movement();
}
