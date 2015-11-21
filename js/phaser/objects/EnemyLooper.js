var Consola = Consola || {};
//BEGIN ENEMYLooper
Consola.EnemyLooper = function (game, x, y, key, frame) {
	
    Phaser.Sprite.call(this, game, x+Consola.Constants.CELL_WIDTH / 2, y+Consola.Constants.CELL_WIDTH / 2, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;
	
	//Enemy Looper movement with steps
	this.turn = false;
	this.acting = false;

	//PROJECTILES
	this.count = 0;
	this.projectile = new Consola.Projectile(game, 
										0+Consola.Constants.CELL_WIDTH / 2, 
										0+Consola.Constants.CELL_WIDTH / 2, 'projectiles', 71);
	this.projectile.visible = false;
	this.projectile.exists = false;
	game.add.existing(this.projectile);
	// this.addChild(this.projectile);
	

	

    // 	// add custom animations
	// 	this.animations.add('stand', [0, 1], 20, true);
	// 	this.animations.play('stand');
};

Consola.EnemyLooper.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.EnemyLooper.prototype.constructor = Consola.EnemyLooper;	//Assign out custom constructor declared above
Consola.EnemyLooper.prototype.move = function (x, y){
	var that = this;

	this.moving = true;

	var newX = this.x + x*Consola.Constants.CELL_WIDTH;
	var newY = this.y + y*Consola.Constants.CELL_HEIGHT;

	//STEP 1
	var tween1 = this.game.add.tween(this).to( 
							{ x: newX, 
								y:  newY}, 
								400, Phaser.Easing.Linear.None);

	var tween2 = this.game.add.tween(this).to( 
							{ x: newX + x*Consola.Constants.CELL_WIDTH, 
								y:  newY + y*Consola.Constants.CELL_HEIGHT}, 
								400, Phaser.Easing.Linear.None);
	tween2.onComplete.add(
			function(){
				console.log("Tween over");
				// console.log(that);
				that.moving = false;
				that.rotation -= Math.PI/2;
				//Update orientation
				if(that.rotation < -Math.PI/2){
					//West
					that.frame = 3;
					that.scale.y = -1;
				}else if(that.rotation < 0){
					//North
					that.frame = 3;
					that.scale.y = 1;
				}else if(that.rotation < Math.PI/2){
					//East
					that.frame = 3;
					that.scale.y = 1;
				}else{
					//South
					that.frame = 3;
					that.scale.y = 1;
				}

				setTimeout(that.fire(), 50);
			});


	tween1.chain(tween2);
	
	tween1.start();
};

Consola.EnemyLooper.prototype.fire = function (){
	var that = this;

	var newX;
	var newY;

	this.projectile.visible = true;
	this.projectile.exists = true;

	this.projectile.x = this.x;
	this.projectile.y = this.y;

	//Rotation is converted to values between -Math.PI, Math.PI
	if(this.rotation < -Math.PI){
		console.log("Shooting A");
		newX = this.projectile.x;
		newY = this.projectile.y + this.projectile.range*Consola.Constants.CELL_HEIGHT;
	}else if(this.rotation < -Math.PI/2){
		console.log("Shooting B");
		newX = this.projectile.x - this.projectile.range*Consola.Constants.CELL_WIDTH;
		newY = this.projectile.y;
	}else if(this.rotation < 0){
		console.log("Shooting C");
		newX = this.projectile.x;
		newY = this.projectile.y - this.projectile.range*Consola.Constants.CELL_HEIGHT;
	}else if(this.rotation < Math.PI/2){
		//East
		console.log("Shooting D");
		newX = this.projectile.x + this.projectile.range*Consola.Constants.CELL_WIDTH;
		newY = this.projectile.y;
	}else{
		console.log("Shooting E");
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
				that.acting = false;
				that.projectile.x = 0;	//reset position to avoid invisible collision
				that.projectile.y = 0;
			});

	this.projectile.moving = true;
	tween.start();
};

Consola.EnemyLooper.prototype.handleCollision = function(other, enemylooper){
	console.log("EnemyLooper collision with player detected");
	if(other === player){
		if(other.playerMoveTween){
			other.playerMoveTween.stop();
			other.x = other.currentX;	//Reset position to where tween began.
			other.y = other.currentY;
			other.moving = false;
		}
	}
};

Consola.EnemyLooper.prototype.forward = function (){
	//Update orientation
	if(this.rotation < -Math.PI/2){
		//West
		this.frame = 3;
		this.scale.y = -1;
	}else if(this.rotation < 0){
		//North
		this.frame = 3;
		this.scale.y = 1;
	}else if(this.rotation < Math.PI/2){
		//East
		this.frame = 3;
		this.scale.y = 1;
	}else{
		//South
		this.frame = 3;
		this.scale.y = 1;
	}

	//Rotation is converted to values between -Math.PI, Math.PI
	if(this.rotation < -Math.PI/2){
		//South
		this.move(0,1);
	}else if(this.rotation < 0){
		//West
		this.move(-1,0);
	}else if(this.rotation < Math.PI/2){
		//North
		this.move(0,-1);
	}else{
		//East
		this.move(1,0);
	}
};

Consola.EnemyLooper.prototype.update = function(){
	//Check projectile collision
	this.game.physics.arcade.overlap(this.projectile, player, this.handleBulletCollision, null, this);
	this.game.physics.arcade.overlap(player, this, this.handleCollision, null, this);

	if(!Consola.Global.turnBased){
	//NO TURN BASED
		if(this.turn){
			this.forward();
			this.count = 0;
			this.turn = false;
			this.acting = true;
		}else{
			if(!this.acting){
				this.count++;	
			}
		}

		
		if(this.count > 20){
			// console.log("6");
			this.turn = true;
		}
	}else{
	//TURN BASED
		if(!Consola.Global.playerTurn){
			this.count = 0;
			console.log("EnemyLooper turnbased");
			this.forward();
		}
	}

	//Update orientation
	if(this.rotation < -Math.PI/2){
		//West
		this.frame = 3;
		this.scale.y = -1;
	}else if(this.rotation < 0){
		//North
		this.frame = 3;
		this.scale.y = 1;
	}else if(this.rotation < Math.PI/2){
		//East
		this.frame = 3;
		this.scale.y = 1;
	}else{
		//South
		this.frame = 3;
		this.scale.y = 1;
	}
};
//END EnemyLooper