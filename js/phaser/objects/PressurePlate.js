var Consola = Consola || {};
//BEGIN ENEMYLooper
Consola.PressurePlate = function (game, x, y, key, frame) {
	
    Phaser.Sprite.call(this, game, x+Consola.Constants.CELL_WIDTH / 2, y+Consola.Constants.CELL_WIDTH / 2, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;

	this.pressed;
	this.count = 0;
	
};

Consola.PressurePlate.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.PressurePlate.prototype.constructor = Consola.PressurePlate;	//Assign out custom constructor declared above

Consola.PressurePlate.prototype.handlePressurePlateCollision = function(plate, player){
	console.log("Pressure plate activated");
	console.log(this);

	this.pressed = true;
	debug = Consola.game;
	debug2 = plate;
	
	this.game.walls.children.forEach(function(wall){
		if(plate.target == wall.target){
			wall.exists = false;
			wall.visible = false;
		}
	});
};

Consola.PressurePlate.prototype.update = function(){
	var plate = this;

	if(!Consola.Global.turnBased){
	//NO TURN BASED
		//Check pressure plate collision
		if( this.game.physics.arcade.overlap(this, player, this.handlePressurePlateCollision, null, this) ){
			this.pressed = true;
		}else if(this.pressed){
			//This runs only once after player steps off pressure plate to avoid colliding with other PP that 
			//target the same door
			this.pressed = false;
			//Close target doors
			this.game.walls.children.forEach(function(wall){
				if(wall.target == plate.target && !wall.exists){
					wall.exists = true;
					wall.visible = true;
				}
			});
		}

	}else{
	//TURN BASED
		if(!Consola.Global.playerTurn){
			if( this.game.physics.arcade.overlap(this, player, this.handlePressurePlateCollision, null, this) ){
				this.pressed = true;
			}else{
				this.pressed = false;
				//Close target doors
				this.game.walls.children.forEach(function(wall){
					if(wall.name == 'door1' && !wall.exists){
						wall.exists = true;
						wall.visible = true;
					}
				});
			}
		}
	}
};
//END PressurePlate