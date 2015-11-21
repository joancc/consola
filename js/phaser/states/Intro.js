Consola.Intro = function() {};

//setting game configuration and loading the assets for the loading screen
Consola.Intro.prototype = {
    preload: function() {
        Consola.Global = Consola.Global || {};
    },

    create: function() {
        //Keep game running when losing focus to use Blockly
        this.stage.disableVisibilityChange = true;

        //DEBUGGING: enable fps tracking
        this.game.time.advancedTiming = true;

        //UI
        //Create dialogue
        speech = this.game.cache.getJSON('speech');
        dialogue = new Consola.Dialogue(this.game, 0, 0);
        dialogue.insertSpeech(speech);
    },

    update: function() {
        this.game.time.fps;
    },
};