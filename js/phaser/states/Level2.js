var debug;
var debug2;

Consola.Level2 = function() {};

//setting game configuration and loading the assets for the loading screen
Consola.Level2.prototype = {
    preload: function() {
        this.moving = false;
        this.enemiesMoving = false;

        Consola.Global = Consola.Global || {};
        Consola.Global.turnBased = false; //Activate for battle mode
        Consola.Global.playerTurn = false; 
    },

    create: function() {
        //Keep game running when losing focus to use Blockly
        this.stage.disableVisibilityChange = true;

        //DEBUGGING: enable fps tracking
        this.game.time.advancedTiming = true;

        // //set world dimensions
        // // this.game.world.setBounds(0, 0, 1920, 1920);
        // this.game.world.setBounds(0, 0, Consola.Constants.ROWS * Consola.Constants.CELL_WIDTH, Consola.Constants.COLS * Consola.Constants.CELL_HEIGHT);

        // //BACKGROUND
        // this.game.add.sprite(0, 0, 'sky');

        // //CREATE MAP
        // this.drawMap(initMap(Consola.Constants.ROWS, Consola.Constants.COLS));



        //TILEMAP
        this.map = this.game.add.tilemap('level2');

		    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
		    this.map.addTilesetImage('dude', 'dude');
		    this.map.addTilesetImage('baddie', 'enemy');
		    this.map.addTilesetImage('sky', 'sky');
		    this.map.addTilesetImage('platform', 'walls');

		    //CREATE TILED LAYERS
		    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
		    
		    //WALLS
		    //create sprites from object layer in Tiled file. Open json file to get gid.
		    this.walls = this.game.add.group();
		    this.map.createFromObjects('ObjectBlockingLayer', 12, 'walls', 0, true, false, this.walls);
		    this.game.physics.arcade.enable(this.walls);	//Enable physics on group for overlap detection
		    
		    //ENEMIES
		    this.enemies = this.game.add.group();
		    this.map.createFromObjects('ObjectEnemyLayer', 473, 'enemy', 0, true, false, this.enemies, Consola.Enemy);
		    this.game.physics.arcade.enable(this.enemies);	//Enable physics on group for overlap detection
                //Apply rotation.
                this.enemies.children.forEach(function(enemy) {

                    switch(enemy.facing){
                        case "N":
                            enemy.rotation  = 0;
                            break;
                        case "E":
                            enemy.rotation = Math.PI/2;
                            break;
                        case "S":
                            enemy.rotation = Math.PI;
                            break;
                        case "W":
                            enemy.rotation = Math.PI*3/2;
                            break;
                        default:
                            console.log("Invalid rotation");
                            break; 
                    }
                    console.log(enemy.rotation);
                });
                debug = this.walls;
		    

		    //EXIT
		    this.exit = this.game.add.group();
		    this.map.createFromObjects('ObjectEnemyLayer', 2, 'dude', 0, true, false, this.exit, Consola.Exit);
		    this.game.physics.arcade.enable(this.exit);	//Enable physics on group for overlap detection

		    //resizes the game world to match the layer dimensions
		    this.backgroundLayer.resizeWorld();
		//END TILEMAP



        //PLAYER
        player = new Consola.Player(this.game, 
                                        Consola.Constants.CELL_WIDTH*1 + Consola.Constants.CELL_WIDTH / 2, 
                                        Consola.Constants.CELL_HEIGHT*10 + Consola.Constants.CELL_HEIGHT / 2, 
                                        'dude'); //Add CELL_WIDTH/2 to account for pivot in center

        this.game.add.existing(player);
        debug2 = player;

        //ENEMIES
        Consola.Level2.enemies = [];
        // Consola.Level2.enemies = game.add.group();
        // Consola.Level2.enemies.add.existing(enemy);

        // enemy = new Consola.Enemy(this.game, 64, 64, 'enemy');
        // Consola.Level2.enemies.push(enemy);
        // this.game.add.existing(enemy);

        // enemy = new Consola.Enemy(this.game, 128, 128, 'enemy');
        // Consola.Level2.enemies.push(enemy);
        // this.game.add.existing(enemy);

        // enemy = new Consola.Enemy(this.game, 64, 128, 'enemy');
        // Consola.Level2.enemies.push(enemy);
        // this.game.add.existing(enemy);


        //INPUT
        //Keyboard input
        cursors = this.game.input.keyboard.createCursorKeys();

        //GRID
        drawGrid(Consola.Constants.ROWS, Consola.Constants.COLS, Consola.Constants.CELL_WIDTH, Consola.Constants.CELL_HEIGHT);

        //UI
        scoreText = this.game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
    },

    handleBlockingLayerCollision: function(player, object){
    	console.log("Blocking Layer Collision");
    	console.log(player, object);
    	if(player.playerMoveTween){
			player.playerMoveTween.stop();
			player.x = player.currentX;	//Reset position to where tween began.
			player.y = player.currentY;
			player.moving = false;
		}
    },

    handleEnemyCollision: function(player, enemy){
		console.log("Enemy collision detected");
		console.log(player, enemy);
		if(player.playerMoveTween){
			player.playerMoveTween.stop();
			player.x = player.currentX;	//Reset position to where tween began.
			player.y = player.currentY;
			player.moving = false;
		}
	},

    update: function() {
        this.game.time.fps;

    	this.game.physics.arcade.overlap(player, this.walls, this.handleBlockingLayerCollision, null, this);
    	this.game.physics.arcade.overlap(player, this.enemies, this.handleEnemyCollision, null, this);

        if(!Consola.Global.turnBased){
            if (!player.moving) {
                //LEFT
                if (cursors.left.isDown) {
                    player.move(-1, 0);
               //RIGHT
                } else if (cursors.right.isDown) {
                    player.move(1, 0);
                //UP    
                } else if (cursors.up.isDown) {
                    player.move(0, -1);
                //DOWN
                } else if (cursors.down.isDown) {
                    player.move(0, 1);
                }
            }
        }

        //Allow one cycle for execution of enemy turn
        Consola.Global.playerTurn = true;  

        //After the code is executed, and the player is no longer moving,
        //set playerTurn to false to allow for single enemy execution
        if(Consola.Global.blocklyExecuted && !player.moving){
            console.log("@");
            Consola.Global.blocklyExecuted = false;
            Consola.Global.playerTurn = false;
        }
    },

    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
	findObjectsByType: function(type, map, layer) {
		var result = new Array();
		map.objects[layer].forEach(function(element){
		  if(element.properties.type === type) {
		    //Phaser uses top left, Tiled bottom left so we have to adjust the y position
		    //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
		    //so they might not be placed in the exact pixel position as in Tiled
		    element.y -= map.tileHeight;
		    result.push(element);
		  }      
		});
		return result;
	},

    drawMap: function(map) {
        walls = this.game.add.group();
        walls.enableBody = true;

        for (var i = 0; i < Consola.Constants.ROWS; i++) {
            for (var j = 0; j < Consola.Constants.COLS; j++) {
                if (map[i][j] == '#') {
                    walls.create(Consola.Constants.CELL_WIDTH * j, Consola.Constants.CELL_HEIGHT * i, 'walls', 0);
                    //Animation name, frames, frame rate, loop=true
                    // player.animations.add('left', [0,1,2,3], 10, true);
                };
            };
        };
    }
};

function initMap(ROWS, COLS) {
    // create a new random map
    map = [];
    for (var y = 0; y < ROWS; y++) {
        var newRow = [];
        for (var x = 0; x < COLS; x++) {
            if (x == 0 || y == 0 || x == COLS - 1 || y == ROWS - 1) {
                newRow.push('#');
            } else if (Math.random() > 0.8) {
                newRow.push('#');
            } else {
                newRow.push('.');
            }
        }
        map.push(newRow);
    }

    return map;
}

function drawGrid(ROWS, COLS, CELL_WIDTH, CELL_HEIGHT) {
    var graphics = Consola.game.add.graphics(0, 0);

    for (var i = 0; i < ROWS; i++) {
        graphics.lineStyle(1, 'black', 1);

        graphics.moveTo(0, i * CELL_HEIGHT);
        graphics.lineTo(CELL_WIDTH*COLS, i * CELL_HEIGHT);
    };

    for (var j = 0; j < COLS; j++) {
        graphics.lineStyle(1, 'black', 1);

        graphics.moveTo(j * CELL_WIDTH, 0);
        graphics.lineTo(j * CELL_WIDTH, CELL_HEIGHT*ROWS);
    };
}
