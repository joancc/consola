var Consola = Consola || {};
//BEGIN PLAYER
Consola.Player = function (game, x, y, key, frame) {

    Phaser.Sprite.call(this, game, x, y, key);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.moves = false;	//Set to false, since we're using tweens to move
    this.anchor.setTo(0.5, 0.5);
    this.frame = frame;
    this.moving = false;

    this.currentX = x;	//Used when interrupting tweens to reset position
    this.currentY = y;

    this.inventory = {};

    //add custom animations PARAMS: name, frames, frame rate, loop=true
	// this.animations.add('left', [0,1,2,3], 10, true);
	// this.animations.add('right', [5,6,7,8], 10, true);
	// this.animations.play('left');
};

Consola.Player.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Player.prototype.constructor = Consola.Player;	//Assign out custom constructor declared above

Consola.Player.prototype.move = function (x, y){
	var that = this;

	this.moving = true;

	var newX = this.x + x*Consola.Constants.CELL_WIDTH;
	var newY = this.y + y*Consola.Constants.CELL_HEIGHT;
	
	that.playerMoveTween = this.game.add.tween(this).to( 
							{ x: newX, 
								y:  newY}, 
								400, Phaser.Easing.Linear.None);

	that.playerMoveTween.onComplete.add(
		function(){
			that.currentX = that.x;
			that.currentY = that.y;
			that.moving = false;
		}
	);

	that.playerMoveTween.start();
};

Consola.Player.prototype.rotate = function (radians){
	//Rotation is converted to values between -Math.PI, Math.PI
	player.rotation += radians;

	if(player.rotation < -Math.PI/2){
		//West
		player.frame = 0;
		player.scale.y = -1;
	}else if(player.rotation < 0){
		//North
		player.frame = 0;
		player.scale.y = 1;
	}else if(player.rotation < Math.PI/2){
		//East
		player.frame = 0;
		player.scale.y = 1;
	}else{
		//South
		player.frame = 0;
		player.scale.y = 1;
	}
};

Consola.Player.prototype.forward = function (){
	//Rotation is converted to values between -Math.PI, Math.PI
	if(player.rotation < -Math.PI/2){
		//West
		player.move(-1,0);
	}else if(player.rotation < 0){
		//North
		player.move(0,-1);
	}else if(player.rotation < Math.PI/2){
		//East
		player.move(1,0);
	}else{
		//South
		player.move(0,1);
	}
};

Consola.Player.prototype.update = function(){
	
}
//END PLAYER