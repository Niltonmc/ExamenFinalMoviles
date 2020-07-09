Selection = function () {}

Selection.prototype = {
    create:function(){

        console.log("Se cargó exitosamente la escena selección");

        this.bg = this.game.add.sprite(0,0,"bg");
        this.bg.anchor.setTo(0.5,0.5);
        this.bg.scale.setTo(0.5,0.5);
        this.bg.x = this.world.centerX 
        this.bg.y = this.world.centerY
        

        this.txtNormal = this.game.add.text(0,0,"Normal",{ 
            fontSize: '40px', fill: '#000000' 
        });
        this.txtNormal.anchor.setTo(0.5,0.5);
        this.txtNormal.x = this.world.centerX 
        this.txtNormal.y = this.world.centerY - 50
        this.txtNormal.inputEnabled = true;
        this.txtNormal.events.onInputDown.add(this.GoNormalGame,this);


        this.txtHard = this.game.add.text(0,0,"Parao sin polo",{ 
            fontSize: '40px', fill: '#000000' 
        });
        this.txtHard.anchor.setTo(0.5,0.5);
        this.txtHard.x = this.world.centerX 
        this.txtHard.y = this.world.centerY + 50
        this.txtHard.inputEnabled = true;
        this.txtHard.events.onInputDown.add(this.GoHardGame,this);

        localStorage.totalscore = 0;
    },

    GoNormalGame:function(){
        console.log("Se empieza a cargar la escena juego normal");
        localStorage.lives = 4;
		this.state.start("Game");
    },

    GoHardGame:function(){
        console.log("Se empieza a cargar la escena juego hard");
        localStorage.lives = 1;
		this.state.start("Game");
    }
};