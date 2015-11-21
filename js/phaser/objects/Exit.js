var Consola = Consola || {};
//BEGIN EXIT
Consola.Exit = function (game, x, y, key, frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.moves = false;
	this.frame = frame;
	this.collisionDetected = false;

};

Consola.Exit.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Exit.prototype.constructor = Consola.Exit;	//Assign out custom constructor declared above


Consola.Exit.prototype.handleCollision = function(){
	console.log("Collison with exit");
	this.collisionDetected = true; //Disable exit collisions. This is reactivated on next level load;

	var currentState = this.game.state.current;


	Consola.Global.Dungeon1.currentFloor++;




	// if(Consola.Global.Dungeon1.currentFloor == 2){
	// 	console.log("Loading level 2");
	// 	// this.game.state.start('Level2');
	// 	this.game.state.start('dungeon1_1');
	// }else if(Consola.Global.Dungeon1.currentFloor == 3){
	// 	console.log("Loading level 3");
	// 	// this.game.state.start('Level3');
	// 	this.game.state.start('dungeon1_2');
	// }else{
		console.log("Restarting Test");
		this.game.state.start(this.game.state.current);
	// }
	
}

Consola.Exit.prototype.update = function(){
	if(!this.collisionDetected){
		this.game.physics.arcade.overlap(this, player, this.handleCollision, null, this);
	}
}
//END EXIT