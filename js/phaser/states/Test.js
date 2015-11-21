Consola.Test = function() {};

//setting game configuration and loading the assets for the loading screen
Consola.Test.prototype = {
    preload: function() {
        Consola.Global = Consola.Global || {};
        Consola.Global.turnBased = false; //Activate for battle mode
        Consola.Global.playerTurn = false; 

        this.moving = false;
        this.enemiesMoving = false;
    },

    create: function() {
        //Keep game running when losing focus to use Blockly
        this.stage.disableVisibilityChange = true;

        //DEBUGGING: enable fps tracking
        this.game.time.advancedTiming = true;


        //LOAD TILEMAP
        tilemap = '';
        // if(Consola.Global.Dungeon1.currentFloor == 1){
        //     tilemap = 'dungeon1_1';
        // }else if(Consola.Global.Dungeon1.currentFloor == 2){
        //     tilemap = 'dungeon1_2';
        // }else if(Consola.Global.Dungeon1.currentFloor == 3){
        //     tilemap = 'dungeon1_3';
        // }else{
        //     tilemap = 'test';
        // }

        tilemap = '20x20';
        Consola.Helpers.loadTiledMap.call(this, tilemap);
		//END LOAD TILEMAP

        //A*
        // astar = this.game.plugins.add(Phaser.Plugin.AStar);
        // astar.setAStarMap(this.map, 'AStarLayer', 'walls');
        // astar._useDiagonal = false; //No diagonal movement allowed

        // var start = {x: 5, y: 8};
        // var goal = {x: 10, y: 10};
        // var path = astar.findPath(start, goal);
        // path.nodes[path.nodes.length-1]; //Next optimal node
        //End A*


        //PLAYER
        player = new Consola.Player(this.game, 
                                        Consola.Constants.CELL_WIDTH*1 + Consola.Constants.CELL_WIDTH / 2, 
                                        Consola.Constants.CELL_HEIGHT*10 + Consola.Constants.CELL_HEIGHT / 2, 
                                        'sena_spritesheet'); //Add CELL_WIDTH/2 to account for pivot in center

        this.game.add.existing(player);

        // Make the camera follow the player.
        this.game.camera.follow(player);


        //INPUT
        //Keyboard input
        cursors = this.game.input.keyboard.createCursorKeys();

        //GRID
                //Width in tiles, 
        Consola.Helpers.drawGrid(this.map.height, this.map.width, Consola.Constants.CELL_WIDTH, Consola.Constants.CELL_HEIGHT);
        console.log(this.map);

        //UI
        //Create dialogue
        if(Consola.Global.Dungeon1.currentFloor == 1){
            speech = this.game.cache.getJSON('speech');
            dialogue = new Consola.Dialogue(this.game, 0, 0);
            dialogue.insertSpeech(speech);
        }

        //Buttons
        //(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        parserButton = this.game.add.button(this.game.width - 64, 0, 'UI_buttons', this.parserClick, this, 1, 1, 1, 1);
        parserButton.fixedToCamera = true;  //Fixed position on screen
        runButton = this.game.add.button(this.game.width - 132, 0, 'UI_buttons', this.runClick, this, 0, 0, 0, 0);
        runButton.fixedToCamera = true;
        runButton.visible = false;
    },

    parserClick: function(){
        Consola.Global.turnBased = !Consola.Global.turnBased;

        if(Consola.Global.turnBased){
          //Apply filter. Visual feedback for parser mode.
          Consola.game.stage.filters = [Consola.Constants.grayFilter];
          $blockly.show();
          runButton.visible = true;
        }else{
          //Remove filter
          Consola.game.stage.filters = null;
          $blockly.hide();
          runButton.visible = false;
        }
    },

    runClick: function(){
        console.log("Execute blockly");
        executeBlockly();
        parserButton.visible = false;
        runButton.visible = false;
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

    update: function() {
        this.game.time.fps;

        //Check collisions with walls and blocking elements
    	this.game.physics.arcade.overlap(player, this.game.walls, this.handleBlockingLayerCollision, null, this);

        if(!Consola.Global.turnBased){
            if (!player.moving) {
                //LEFT
                if (cursors.left.isDown) {
                    player.frame = 0;
                    player.scale.y = -1;
                    player.rotation = -Math.PI;
                    player.move(-1, 0);
               //RIGHT
                } else if (cursors.right.isDown) {
                    player.frame = 0;
                    player.scale.y = 1;
                    player.rotation = 0;
                    player.move(1, 0);
                //UP    
                } else if (cursors.up.isDown) {
                    player.frame = 0;
                    player.scale.y = 1;
                    player.rotation = -Math.PI/2;
                    player.move(0, -1);
                //DOWN
                } else if (cursors.down.isDown) {
                    player.frame = 0;
                    player.scale.y = 1;
                    player.rotation = Math.PI/2;
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
};