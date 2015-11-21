var Consola = Consola || {};
//BEGIN ENEMYLooper
Consola.Collectible = function (game, x, y, key, frame) {
	
    Phaser.Sprite.call(this, game, x+Consola.Constants.CELL_WIDTH / 2, y+Consola.Constants.CELL_WIDTH / 2, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;

	this.pressed;
	this.count = 0;
	
};

Consola.Collectible.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Collectible.prototype.constructor = Consola.Collectible;	//Assign out custom constructor declared above

Consola.Collectible.prototype.handleCollision = function(other, collectible){
	if(other === player){
		console.log("Collectible picked up");
		

		player.inventory[collectible.name] = (player.inventory[collectible.name]+1) || 1;
		
		collectible.destroy();

		//TODO: custom blocks per collectible item? Where to insert? At 0,0? 
		//Probably want to insert block from the inventory instead of here
		InsertBlock("math_number", 0, 0, true, true, false);
	}
};


Consola.Collectible.prototype.update = function(){
	this.game.physics.arcade.overlap(player, this, this.handleCollision, null, this);
};
//END Collectible