var Consola = Consola || {};

console.log("BOOT...");
Consola.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
Consola.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.minWidth = this.gameWidth/2;
    this.scale.minHeight = this.gameHeight/2;
    this.scale.maxWidth = this.gameWidth*2.5;
	this.scale.maxHeight = this.gameHeight*2.5;

	// this.scale.minWidth = 240;
	// this.scale.minHeight = 170;
	// this.scale.maxWidth = 2880;
	// this.scale.maxHeight = 1920;
	
	//have the game centered
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;

	//screen size will be set automatically
	this.scale.setScreenSize(true);

	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};