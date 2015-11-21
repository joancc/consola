var Consola = Consola || {};
//BEGIN PROJECTILE
Consola.Projectile = function (game, x, y, key, frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;
	this.range = 2;
	this.moving = false;

    // 	// add custom animations
	// 	this.animations.add('stand', [0, 1], 20, true);
	// 	this.animations.play('stand');
};

Consola.Projectile.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Projectile.prototype.constructor = Consola.Projectile;	//Assign out custom constructor declared above

Consola.Projectile.prototype.handleCollision = function(other, projectile){
	console.log("Projectile collision with player detected");
	console.log(other);
	if(other === player){
		projectile.exists = false;

		//Restart state
		this.game.state.start(this.game.state.current);
	}
};

Consola.Projectile.prototype.update = function(){
	// console.log(this);
	if(this.game.physics.arcade.overlap(player, this, this.handleCollision, null, this)){
		console.log("HIT");
		console.log(this);
		console.log(this.handleCollision);
	}
}
//END PROJECTILE