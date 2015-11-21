var Consola = Consola || {};
//BEGIN ENEMY
Consola.Enemy = function (game, x, y, key, frame) {
	
    Phaser.Sprite.call(this, game, x+Consola.Constants.CELL_WIDTH / 2, y+Consola.Constants.CELL_WIDTH / 2, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;
	
	//PROJECTILES
	this.count = 0;
	this.projectile = new Consola.Projectile(game, 
										0+Consola.Constants.CELL_WIDTH / 2, 
										0+Consola.Constants.CELL_WIDTH / 2, 'explosions', 71);
	this.projectile.visible = false;
	this.projectile.exists = false;
	game.add.existing(this.projectile);
	// this.addChild(this.projectile);
	

	

    // 	// add custom animations
	// 	this.animations.add('stand', [0, 1], 20, true);
	// 	this.animations.play('stand');
};

Consola.Enemy.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Enemy.prototype.constructor = Consola.Enemy;	//Assign out custom constructor declared above
Consola.Enemy.prototype.move = function (x, y){
	var that = this;

	var newX = this.x + x*Consola.Constants.CELL_WIDTH;
	var newY = this.y + y*Consola.Constants.CELL_HEIGHT;
	
	var tween = this.game.add.tween(this).to( 
							{ x: newX, 
								y:  newY}, 
								400, Phaser.Easing.Linear.None);

	tween.onComplete.add(
			function(){
				console.log("Tween over");
				console.log(that);
				that.moving = false;
			});

	tween.start();
};
Consola.Enemy.prototype.fire = function (){
	var that = this;

	var newX;
	var newY;

	this.projectile.visible = true;
	this.projectile.exists = true;

	this.projectile.x = this.x;
	this.projectile.y = this.y;

	//Rotation is converted to values between -Math.PI, Math.PI
	if(this.rotation < -Math.PI/2){
		newX = this.projectile.x - this.projectile.range*Consola.Constants.CELL_WIDTH;
		newY = this.projectile.y;
	}else if(this.rotation < 0){
		newX = this.projectile.x;
		newY = this.projectile.y - this.projectile.range*Consola.Constants.CELL_HEIGHT;
	}else if(this.rotation < Math.PI/2){
		//East
		newX = this.projectile.x + this.projectile.range*Consola.Constants.CELL_WIDTH;
		newY = this.projectile.y;
	}else{
		newX = this.projectile.x;
		newY = this.projectile.y + this.projectile.range*Consola.Constants.CELL_HEIGHT;
	}
	
	var tween = this.game.add.tween(this.projectile).to( 
							{ x: newX, 
								y:  newY}, 
								400, Phaser.Easing.Linear.None);

	tween.onComplete.add(
			function(){
				that.projectile.visible = false;
				that.projectile.exists = false;
				that.projectile.moving = false;
				that.projectile.x = 0;	//reset position to avoid invisible collision
				that.projectile.y = 0;
			});

	this.projectile.moving = true;
	tween.start();
};

Consola.Enemy.prototype.handleCollision = function(other, enemy){
	console.log("Enemy collision with player detected");
	console.log(other);
	if(other === player){
		if(other.playerMoveTween){
			other.playerMoveTween.stop();
			other.x = other.currentX;	//Reset position to where tween began.
			other.y = other.currentY;
			other.moving = false;
		}
	}
};

Consola.Enemy.prototype.update = function(){
	//Check projectile collision
	// this.game.physics.arcade.overlap(this.projectile, player, this.handleBulletCollision, null, this);
	this.game.physics.arcade.overlap(player, this, this.handleCollision, null, this);

	if(!Consola.Global.turnBased){
	//NO TURN BASED
		this.count++;
		if(this.count > 50){
			this.fire();
			// if(!Consola.Game.enemies[i].children[0].moving){
			// 	Consola.Game.enemies[i].fire();
			// }
			this.count = 0;
		}
	}else{
	//TURN BASED
		if(!Consola.Global.playerTurn){
			if(!this.projectile.moving){
				this.fire();
			}
		}
	}

	//Update orientation
	if(this.rotation < -Math.PI/2){
		//West
		this.frame = 1;
		this.scale.y = -1;
	}else if(this.rotation < 0){
		//North
		this.frame = 1;
		this.scale.y = 1;
	}else if(this.rotation < Math.PI/2){
		//East
		this.frame = 1;
		this.scale.y = 1;
	}else{
		//South
		this.frame = 1;
		this.scale.y = 1;
	}
};
//END Enemy