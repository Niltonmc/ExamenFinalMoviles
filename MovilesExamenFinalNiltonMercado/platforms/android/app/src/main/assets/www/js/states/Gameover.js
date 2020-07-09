Gameover = function () {}
Gameover.prototype = {
    create:function(){
        console.log("Se cargó exitosamente la escena game over");

        this.bg = this.game.add.sprite(0,0,"bg");
        this.bg.anchor.setTo(0.5,0.5);
        this.bg.scale.setTo(0.5,0.5);
        this.bg.x = this.world.centerX 
        this.bg.y = this.world.centerY


        this.txtTitle = this.game.add.text(0,0,"GAME OVER",{ 
            fontSize: '20px', fill: '#000000' 
        });
        this.txtTitle.anchor.setTo(0.5,0.5);
        this.txtTitle.x = this.world.centerX 
        this.txtTitle.y = this.world.centerY - 100

        this.txtScore = this.game.add.text(0,0,"Score: "+ localStorage.totalscore,{
             fontSize: '40px', fill: '#000000' 
            });
        this.txtScore.anchor.setTo(0.5,0.5);
        this.txtScore.x = this.world.centerX 
        this.txtScore.y = this.world.centerY + 50
     
        this.endOfLevelTimer = this.game.time.events.add(3000,function(){
            this.goPlay();
        },this);
	},
	goPlay:function(){
        console.log("Carga la escenena menu");
		this.state.start("Menu");
    }
};