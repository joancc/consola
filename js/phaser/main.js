var Consola = Consola || {};	//namespace Consola

//GLOBALS
Consola.Global = Consola.Global || {};
    Consola.Global.blocklyExecuted = false; //Set to true after executeBlockly()

    Consola.Global.Dungeon1 = {
        currentFloor: 1,
    }

    Consola.Global.currentToolbox = 
        '<block type="controls_repeat">'+
          '<field name="TIMES">3</field>'+
        '</block>'+

        '<block type="controls_repeat_ext">'+
        '</block>'+

        '<block type="math_number" editable="false">'+
          '<field name="NUM">3</field>'+
        '</block>'+

        '<block type="turn_left"></block>'+
        '<block type="turn_right"></block>'+
        '<block type="forward"></block>'

//CONSTANTS
Consola.Constants = Consola.Constants || {};
	// map dimensions
	Consola.Constants.CELL_WIDTH = 32;
	Consola.Constants.CELL_HEIGHT = 32;

	//Number of visible tiles (maps can be larger, though, through the use of camera follow)
	Consola.Constants.ROWS = 12;
	Consola.Constants.COLS = 15;

// Consola.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameContainer');
Consola.game = new Phaser.Game(Consola.Constants.CELL_WIDTH*Consola.Constants.COLS, 
								Consola.Constants.CELL_HEIGHT*Consola.Constants.ROWS, 
								Phaser.AUTO, 
								'gameContainer');
 

Consola.game.state.add('Boot', Consola.Boot);
Consola.game.state.add('Preload', Consola.Preload);
Consola.game.state.add('MainMenu', Consola.MainMenu);
Consola.game.state.add('Game', Consola.Game);

Consola.game.state.add('Intro', Consola.Intro);
Consola.game.state.add('Level1', Consola.Level1);
Consola.game.state.add('Level2', Consola.Level2);
Consola.game.state.add('Level3', Consola.Level3);
Consola.game.state.add('Level4', Consola.Level4);
Consola.game.state.add('Test', Consola.Test);

Consola.game.state.start('Boot');

Consola.Helpers = Consola.Helpers || {};

Consola.Helpers.updateBlocklyToolbox = function(){
    Blockly.updateToolbox(
    '<xml id="toolbox" style="display:  none">' +
        Consola.Global.currentToolbox +
    '</xml>'
  );
}

Consola.Helpers.drawGrid = function(ROWS, COLS, CELL_WIDTH, CELL_HEIGHT) {
    console.log(ROWS, COLS);
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
Consola.Helpers.loadTiledMap = function(tilemap){
    this.map = this.game.add.tilemap(tilemap);

            //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
            // this.map.addTilesetImage('player', 'player');
            this.map.addTilesetImage('sena_spritesheet', 'sena_spritesheet');
            // this.map.addTilesetImage('enemy', 'enemy');
            this.map.addTilesetImage('enemies', 'enemies');
            this.map.addTilesetImage('background', 'background');
            this.map.addTilesetImage('walls', 'walls');
            this.map.addTilesetImage('pressure_plate', 'pressure_plate');
            this.map.addTilesetImage('collectables', 'collectables');


            this.map.addTilesetImage('walls_floors', 'walls_floors');

            //CREATE TILED LAYERS
            // aStarLayer = this.map.createLayer('AStarLayer');   //AStar layer must be first to be hidden by background
            this.backgroundLayer = this.map.createLayer('BackgroundLayer');
            console.log(this.backgroundLayer);

            //WALLS
            //create sprites from object layer in Tiled file. Open json file in Sublime to get gid.
            this.game.walls = this.game.add.group();
                                        //(objectLayerName, gid, assetKey, spritesheetFrame, exists, targetObject)
            this.map.createFromObjects('ObjectBlockingLayer', 23, 'walls_floors', 22, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 24, 'walls_floors', 23, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 12, 'walls_floors', 11, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 2, 'walls_floors', 1, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 1, 'walls_floors', 0, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 25, 'walls_floors', 24, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 14, 'walls_floors', 13, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 3, 'walls_floors', 2, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 29, 'walls_floors', 28, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 22, 'walls_floors', 21, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 11, 'walls_floors', 10, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 5, 'walls_floors', 4, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 7, 'walls_floors', 6, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 29, 'walls_floors', 28, true, false, this.game.walls);
            this.map.createFromObjects('ObjectBlockingLayer', 27, 'walls_floors', 26, true, false, this.game.walls);
            this.game.physics.arcade.enable(this.game.walls);   //Enable physics on group for overlap detection
            
            //ENEMIES
            this.game.enemies = this.game.add.group();
            this.map.createFromObjects('ObjectEnemyLayer', 39, 'enemies', 1, true, false, this.game.enemies, Consola.Enemy);
            this.game.physics.arcade.enable(this.game.enemies);  //Enable physics on group for overlap detection
                //Apply rotation.
                this.game.enemies.children.forEach(function(enemy) {

                    switch(enemy.facing){
                        case "N":
                            enemy.rotation = Math.PI*3/2;
                            break;
                        case "E":
                            enemy.rotation = 0;
                            break;
                        case "S":
                            enemy.rotation  = Math.PI/2;
                            break;
                        case "W":
                            enemy.rotation = Math.PI;
                            break;
                        default:
                            console.log("Invalid rotation");
                            break; 
                    }
                    console.log(enemy.rotation);
                });

            //LOOPERENEMIES
            this.game.looperenemies = this.game.add.group();
            this.map.createFromObjects('ObjectEnemyLooperLayer', 41, 'enemies', 3, true, false, this.game.looperenemies, Consola.EnemyLooper);
            this.game.physics.arcade.enable(this.game.looperenemies);   //Enable physics on group for overlap detection
                //Apply rotation.
                this.game.looperenemies.children.forEach(function(enemy) {

                    switch(enemy.facing){
                        case "N":
                            enemy.rotation = Math.PI*3/2;
                            break;
                        case "E":
                            enemy.rotation = 0;
                            break;
                        case "S":
                            enemy.rotation  = Math.PI/2;
                            break;
                        case "W":
                            enemy.rotation = Math.PI;
                            break;
                        default:
                            console.log("Invalid rotation");
                            break; 
                    }
                    console.log(enemy.rotation);
                });

            //ENEMYFOLLOW
            this.game.followenemies = this.game.add.group();
            this.map.createFromObjects('ObjectEnemyFollowLayer', 43, 'enemies', 5, true, false, this.game.followenemies, Consola.EnemyFollow);
            this.game.physics.arcade.enable(this.game.followenemies);   //Enable physics on group for overlap detection
                //Apply rotation.
                this.game.followenemies.children.forEach(function(enemy) {
                    console.log("Enemyfollow found");
                    switch(enemy.facing){
                        case "N":
                            enemy.rotation = Math.PI*3/2;
                            break;
                        case "E":
                            enemy.rotation = 0;
                            break;
                        case "S":
                            enemy.rotation  = Math.PI/2;
                            break;
                        case "W":
                            enemy.rotation = Math.PI;
                            break;
                        default:
                            console.log("Invalid rotation");
                            break; 
                    }
                    console.log(enemy.rotation);
                });

            //ENEMYFOLLOWSMART
            this.game.followsmartenemies = this.game.add.group();
            this.map.createFromObjects('ObjectEnemyFollowSmartLayer', 474, 'enemies', 3, true, false, this.game.followsmartenemies, Consola.EnemyFollowSmart);
            this.game.physics.arcade.enable(this.game.followsmartenemies);   //Enable physics on group for overlap detection
                //Apply rotation.
                this.game.followsmartenemies.children.forEach(function(enemy) {
                    console.log("Enemyfollowsmart found");
                    switch(enemy.facing){
                        case "N":
                            enemy.rotation = Math.PI*3/2;
                            break;
                        case "E":
                            enemy.rotation = 0;
                            break;
                        case "S":
                            enemy.rotation  = Math.PI/2;
                            break;
                        case "W":
                            enemy.rotation = Math.PI;
                            break;
                        default:
                            console.log("Invalid rotation");
                            break; 
                    }
                    console.log(enemy.rotation);
                });

            debug = this.game.followsmartenemies;

            //PRESSURE PLATES
            console.log("Drawing pressure plates");
            this.game.pressurePlates = this.game.add.group();
                                        //(objectLayerName, gid, assetKey, spritesheetFrame, false, targetObject, 'instanceClass')
            this.map.createFromObjects('ObjectPressurePlateLayer', 30, 'walls_floors', 29, true, false, this.game.pressurePlates, Consola.PressurePlate);
            this.game.physics.arcade.enable(this.game.pressurePlates);    //Enable physics on group for overlap detection

            //COLLECTIBLES
            console.log("Drawing collectables");
            this.game.collectibles = this.game.add.group();
                                        //(objectLayerName, gid, assetKey, spritesheetFrame, false, targetObject, 'instanceClass')
            this.map.createFromObjects('ObjectCollectibleLayer', 34, 'collectables', 0, true, false, this.game.collectibles, Consola.Collectible);
            this.game.physics.arcade.enable(this.game.collectibles);    //Enable physics on group for overlap detection
            
            
            //EXIT
            console.log("Drawing exits");
            this.game.exit = this.game.add.group();
            this.map.createFromObjects('ObjectExitLayer', 32, 'walls_floors', 31, true, false, this.game.exit, Consola.Exit);
            this.game.physics.arcade.enable(this.game.exit);    //Enable physics on group for overlap detection

            //resizes the game world to match the layer dimensions
            this.backgroundLayer.resizeWorld();
}