Consola.MainMenu = function(){};

Consola.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'MainMenu_Backdrop');
    
    //give it speed in x
    // this.background.autoScroll(-20, 0);

    // Play button
    //(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
    //Subtracting button img width from x coordinate
    playButton = this.game.add.button(this.game.width/2 - 170, this.game.height/2, 'PlayButton', this.startgame, this, 1, 0);

    //start game text
    // var text = "Tap to begin";
    // var style = { font: "30px Arial", fill: "#fff", align: "center" };
    // var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    // t.anchor.set(0.5);

    //highest score
    // text = "Highest score: "+this.highestScore;
    //style = { font: "15px Arial", fill: "#fff", align: "center" };
  
    // var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    // h.anchor.set(0.5);
  },

  startgame: function(){
    console.log("Game");
  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      // this.game.state.start('Game');
      // this.game.state.start('Level1');
      this.game.state.start('Test');
    }
  }
};