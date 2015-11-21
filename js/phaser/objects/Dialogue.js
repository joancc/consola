var Consola = Consola || {};
//BEGIN DIALOGUE
Consola.Dialogue = function (game, x, y, key, frame) {
	this.game = game;
};

Consola.Dialogue.prototype = Object.create(Phaser.Sprite.prototype);	//Clone basic Phaser sprite to extend
Consola.Dialogue.prototype.constructor = Consola.Dialogue;	//Assign out custom constructor declared above

Consola.Dialogue.prototype.insertSpeech = function(speech){
	console.log("INSIDE DIALOGUE");
	console.log(this);

	this.speech = speech;

	dialogue = this.game.add.group();
	dialogue.fixedToCamera = true;	//Fixed position to bottom of visible screen
    textbox = this.game.add.sprite(0, 0, 'dialogue_background');
    textbox.width = Consola.game.width;
    textbox.inputEnabled = true;
    textbox.anchor.set(0, 1);
    textbox.position.y = Consola.game.height;
    // textbox.alpha = 0.5;

    //  And then add it to the group
    dialogue.add(textbox);
        

    this.image = this.game.add.sprite(0, 0, 'dialogue_image');
    // this.image.anchor.set(0, 1);
    // this.image.position.y = Consola.game.height - textbox.height/2;
    // this.image.position.y = Consola.game.height - this.image.height;
    dialogue.add(this.image);
    

    

    var currentConversation = speech.start;
    conversation = this.game.add.group();
    dialogue.add(conversation);
    this.updateConversation(currentConversation, this.game);
};

Consola.Dialogue.prototype.optionClicked = function(option){
	console.log("OPTION CLICKED");
	if(option.followup != "null"){
		this.updateConversation(option.followup, this.game);		
	}else{
		console.log("NO MORE OPTIONS");
		dialogue.destroy();
		
	}
}

Consola.Dialogue.prototype.updateConversation = function(currentConversation, game){
	//Destroy current children and update
	for (var i = conversation.children.length - 1; i >= 0; i--) {
		conversation.children[i].destroy();
	};

	if(this.image){
		this.image.destroy();
	}

	//update image
	var imagePosition = this.speech.elements[currentConversation].position;

	DEBUG_CONVO = this.speech;

	if(this.speech.elements[currentConversation].character == "player"){
		this.image = this.game.add.sprite(0, 0, 'dialogue_sena');
		// this.image.position.y = Consola.game.height - textbox.height/2;
    	this.image.position.y = Consola.game.height - this.image.height;
    	//x alignment and animation
		if(imagePosition == "right"){
			//If image to the right, anchor to the right and flip
			this.image.position.x = Consola.game.width + this.image.width;	
			this.image.scale.x = -1;

			var imageTween = this.game.add.tween(this.image).to( 
								{ x: Consola.game.width }, 
									400, Phaser.Easing.Linear.None);
			imageTween.start();
		}else{
			//If image to the right, anchor to the right and flip
			this.image.position.x = - this.image.width;	
			this.image.scale.x = 1;

			var imageTween = this.game.add.tween(this.image).to( 
								{ x: 0 }, 
									400, Phaser.Easing.Linear.None);
			imageTween.start();
		}
	}else if(this.speech.elements[currentConversation].character == "peli"){
		this.image = this.game.add.sprite(0, 0, 'dialogue_peli');
    	this.image.position.y = Consola.game.height - this.image.height + 52;
    	//x alignment and animation
		if(imagePosition == "right"){
			//If image to the right, anchor to the right and flip
			this.image.position.x = Consola.game.width + this.image.width;	
			debug_image = this.image;
			this.image.scale.x = -1;

			var imageTween = this.game.add.tween(this.image).to( 
								{ x: Consola.game.width + 50 }, 
									400, Phaser.Easing.Linear.None);
			imageTween.start();
		}else{
			//If image to the right, anchor to the right and flip
			this.image.position.x = - this.image.width;	
			this.image.scale.x = 1;

			var imageTween = this.game.add.tween(this.image).to( 
								{ x: 0 }, 
									400, Phaser.Easing.Linear.None);
			imageTween.start();
		}
	}
	// this.image.anchor.set(0, 1);
	

    dialogue.add(this.image);

	//Insert text
    var textOptions = this.speech.elements[currentConversation].options;
    var textOptionsNames = Object.getOwnPropertyNames(textOptions);
    for (var i = 0; i < textOptionsNames.length; i++) {
    	var text = game.add.text(
	            textbox.position.x+textbox.width / 2, 
	            textbox.position.y-textbox.height / 2 + i*20, 
	            textOptions[textOptionsNames[i]].text,
	        {
	            font: "Helvetica, Arial, sans-serif", 
	            fill: "#ff0044", 
	            wordWrap: true,
	            wordWrapWidth: textbox.width,
	            align: "center",
	            fontSize: '32px',
	        });
    	text.followup = textOptions[textOptionsNames[i]].followup;
	    text.anchor.set(0.5, 0.5);
	    text.inputEnabled = true;
	    text.events.onInputDown.add(this.optionClicked, this);
	    
	    conversation.add(text);
    	console.log( textOptions[textOptionsNames[i]].text );

    };
};

Consola.Dialogue.prototype.updateImage = function(image, position){

}
//END DIALOGUE