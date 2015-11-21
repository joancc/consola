var Consola = Consola || {};

//loading the game assets
Consola.Preload = function(){};

Consola.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen
  	// this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
   //  this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load tilemaps
    this.load.tilemap('level1', 'assets/tilemaps/map_with_doors.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3', 'assets/tilemaps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level4', 'assets/tilemaps/map_large_with_doors.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('test', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('test2', 'assets/tilemaps/test2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('20x20', 'assets/tilemaps/20x20template.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('dungeon1_1', 'assets/tilemaps/dungeon1_1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('dungeon1_2', 'assets/tilemaps/dungeon1_2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('dungeon1_3', 'assets/tilemaps/dungeon1_3.json', null, Phaser.Tilemap.TILED_JSON);

  	//load game assets
    this.load.image('MainMenu_Backdrop', 'assets/MainMenu_Backdrop.png');
    this.load.spritesheet('PlayButton', 'assets/PlayButton.png', 385, 96);
    this.load.spritesheet('UI_buttons', 'assets/UI_buttons.png', 64, 32);
    
  	this.load.image('space', 'assets/images/space.png');
  	this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');

    //dialogue assets
    this.load.image('dialogue_background', 'assets/dialogue_box.png');
    this.load.image('dialogue_sena', 'assets/sena.png');
    this.load.image('dialogue_peli', 'assets/peli.png');
    this.load.json('speech', 'assets/dialogues/dialogue.json');

    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('sena_spritesheet', 'assets/sena_spritesheet.png', 32, 32);
    this.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
    this.load.spritesheet('enemies', 'assets/enemies.png', 32, 32);
    this.load.spritesheet('walls', 'assets/walls.png', 32, 32);
    this.load.spritesheet('pressure_plate', 'assets/pressure_plate.png', 32, 32);
    this.load.spritesheet('explosions', 'assets/explosion.png', 32, 32);
    this.load.spritesheet('projectiles', 'assets/projectiles.png', 32, 32);
    this.load.spritesheet('collectables', 'assets/collectables.png', 32, 32);
    this.load.spritesheet('walls_floors', 'assets/walls_floors.png', 32, 32);

    //filters
    this.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
  },
  create: function() {
    //Filters
    Consola.Constants.grayFilter = this.game.add.filter('Gray');

  	this.state.start('MainMenu');
  }
};