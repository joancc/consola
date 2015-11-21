var Consola = Consola || {};
//BEGIN ENEMYFollow
Consola.EnemyFollow = function (game, x, y, key, frame) {
	
    Phaser.Sprite.call(this, game, x+Consola.Constants.CELL_WIDTH / 2, y+Consola.Constants.CELL_WIDTH / 2, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.anchor.setTo(0.5, 0.5);
	this.frame = frame;
	
	//Enemy Follow movement with steps
	this.moving = false;
	this.count = 0;

    // 	// add custom animations
	// 	this.animations.add('stand', [0, 1], 20, true);
	// 	this.animations.play('stand');
};

Consola.EnemyFollow.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.EnemyFollow.prototype.constructor = Consola.EnemyFollow;	//Assign out custom constructor declared above
Consola.EnemyFollow.prototype.move = function (x, y){
	var that = this;

	this.moving = true;

	var newX = this.x + x*Consola.Constants.CELL_WIDTH;
	var newY = this.y + y*Consola.Constants.CELL_HEIGHT;

	console.log("Move follow enemy");
	console.log(x, y);
	//STEP 1
	this.tween1 = this.game.add.tween(this).to( 
							{ x: newX, 
								y:  newY}, 
								400, Phaser.Easing.Linear.None);

	this.tween1.onComplete.add(
			function(){
				console.log("Tween over");
				// console.log(that);
				that.moving = false;
				that.currentX = that.x;
				that.currentY = that.y;
			});

	// var tween2 = this.game.add.tween(this).to( 
	// 						{ x: newX + x*Consola.Constants.CELL_WIDTH, 
	// 							y:  newY + y*Consola.Constants.CELL_HEIGHT}, 
	// 							400, Phaser.Easing.Linear.None);
	// tween2.onComplete.add(
	// 		function(){
	// 			console.log("Tween over");
	// 			// console.log(that);
	// 			that.moving = false;
	// 			that.rotation -= Math.PI/2;
	// 			setTimeout(that.fire(), 50);
	// 		});


	// tween1.chain(tween2);
	
	this.tween1.start();
};

Consola.EnemyFollow.prototype.handleCollision = function(other, enemyfollow){
	console.log("enemyfollow collision with player detected");

	this.game.state.start( this.game.state.current );

	if(other === player){
		if(other.playerMoveTween){
			other.playerMoveTween.stop();
			other.x = other.currentX;	//Reset position to where tween began.
			other.y = other.currentY;
			other.moving = false;
		}
	}
};

Consola.EnemyFollow.prototype.forward = function (){
	console.log(this);
	// //Rotation is converted to values between -Math.PI, Math.PI
	// if(this.rotation < -Math.PI/2){
	// 	//South
	// 	this.move(0,1);
	// }else if(this.rotation < 0){
	// 	//West
	// 	this.move(1,0);
	// }else if(this.rotation < Math.PI/2){
	// 	//East
	// 	this.move(1,0);
	// }else{
	// 	//West
	// 	this.move(-1,0);
	// }

	//Rotation is converted to values between -Math.PI, Math.PI
	if(this.rotation == 0){
		//East
		this.move(1,0);
	}else if(this.rotation == Math.PI/2){
		//South
		this.move(0,1);
	}else if(this.rotation == Math.PI){
		//West
		console.log("Moving enemyfollow");
		this.move(-1,0);
	}else{
		//North
		this.move(0,-1);
	}
};

Consola.EnemyFollow.prototype.rotateTowardsPlayer = function(){
	//Rotate to move towards player
	var distance_x = this.x - player.x;
	var distance_y = this.y - player.y;
	console.log(distance_x, distance_y);

	//Priorotize shortening distance along X
	if( Math.abs(distance_x) > 0 ){
		console.log("X ROTATION");
		if(distance_x > 0){
			this.rotation = Math.PI;	
		}else{
			this.rotation = 0;
		}
	}else{
		console.log("Y ROTATION");
		if(distance_y > 0){
			this.rotation = Math.PI*3/2;
		}else{
			this.rotation = Math.PI/2;
		}
	}

	//Update orientation
	if(this.rotation == 0){
		//East
		this.frame = 5;
		this.scale.y = 1;
	}else if(this.rotation == Math.PI/2){
		//South
		this.frame = 5;
		this.scale.y = 1;
	}else if(this.rotation == Math.PI){
		//West
		this.frame = 5;
		this.scale.y = -1;
	}else{
		//North
		this.frame = 5;
		this.scale.y = 1;
	}
};

Consola.EnemyFollow.prototype.handleBlockingLayerCollision = function(enemy, object){
	console.log("Collision enemyfollow and blocking layer");
	if(enemy.tween1){
		enemy.tween1.stop();
		enemy.x = enemy.currentX;	//Reset position to where tween began.
		enemy.y = enemy.currentY;
		enemy.moving = false;
	}
},


Consola.EnemyFollow.prototype.update = function(){
	//Check collision with walls
	this.game.physics.arcade.overlap(this.game.followenemies, this.game.walls, this.handleBlockingLayerCollision, null, this);

	//Check projectile collision
	this.game.physics.arcade.overlap(player, this, this.handleCollision, null, this);

	if(!Consola.Global.turnBased){
	//NO TURN BASED
		if(this.turn){
			this.rotateTowardsPlayer();
			this.forward();
			this.count = 0;
			this.turn = false;
		}else{
			if(!this.moving){
				this.count++;	
			}
		}

		
		if(this.count > 50){
			this.turn = true;
		}
	}else{
	//TURN BASED
		if(!Consola.Global.playerTurn){
			this.count = 0;
			console.log("EnemyFollow turnbased");
			this.rotateTowardsPlayer();
			this.forward();
		}
	}
};
//END EnemyFollow