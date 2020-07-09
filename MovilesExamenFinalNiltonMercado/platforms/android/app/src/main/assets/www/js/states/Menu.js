Menu = function () {}

Menu.prototype = {
    create:function(){

        console.log("Se cargó exitosamente la escena menu");

        this.bg = this.game.add.sprite(0,0,"bg");
        this.bg.anchor.setTo(0.5,0.5);
        this.bg.scale.setTo(0.5,0.5);
        this.bg.x = this.world.centerX 
        this.bg.y = this.world.centerY

        this.txtTitle = this.game.add.text(0,0,"Examen Final",{ 
            fontSize: '20px', fill: '#000000' 
        });
        this.txtTitle.anchor.setTo(0.5,0.5);
        this.txtTitle.x = this.world.centerX 
        this.txtTitle.y = this.world.centerY - 100

        this.txtPlay = this.game.add.text(0,0,"Jugar",{
             fontSize: '40px', fill: '#000000' 
            });
        this.txtPlay.anchor.setTo(0.5,0.5);
        this.txtPlay.x = this.world.centerX 
        this.txtPlay.y = this.world.centerY + 50
        this.txtPlay.inputEnabled = true;
        this.txtPlay.events.onInputDown.add(this.GoSelection,this);

	},
	GoSelection:function(){
        console.log("Se empieza a cargar la escena selección");
		this.state.start("Selection");
    }
};