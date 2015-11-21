$(document).ready(function(){
  $blockly = $("iframe");

  $("#parserMode").hide();
  $run = $("#run");
  $run.hide();

	$("#run").on('click', function(){
		executeBlockly();
		// stepCode(); //Execute first block and stop on highlight
  	console.log("Executed");
	});

  $("#parserMode").on('click', function(){
    Consola.Global.turnBased = !Consola.Global.turnBased;

    if(Consola.Global.turnBased){
      //Apply filter. Visual feedback for parser mode.
      Consola.game.stage.filters = [Consola.Constants.grayFilter];
      $blockly.show();
      $run.show();
    }else{
      //Remove filter
      Consola.game.stage.filters = null;
      $blockly.hide();
      $run.hide();
    }
    
  });
});

var animationCounter = 0;
var animationsArray = [];

//Init is called from index.html, once Blockly has loaded
function initialize(){
  Blockly.mainWorkspace.clear();
  
  // Blockly.updateToolbox(
  //   '<xml id="toolbox" style="display: none">'+
  //   '<category id="catGeneral">'+
  //   '<block type="controls_repeat">'+
  //     '<field name="TIMES">3</field>'+
  //   '</block>'+

  //   '<block type="controls_repeat_ext">'+
  //   '</block>'+

  //   '<block type="math_number" editable="false">'+
  //     '<field name="NUM">3</field>'+
  //   '</block>'+

  //   // '<block type="controls_whileUntil">' +
  //   //   '<field name="MODE">UNTIL</field>' +
  //   //   '<value name="BOOL">' +
  //   //     '<block ' +
  //   //       'movable="false" ' +
  //   //       'type="target">' +
  //   //     '</block>' +
  //   //   '</value>' +
  //   // '</block>' +

  //   // '<block type="controls_if">'+
  //   // '<mutation else="1"></mutation>' +
  //   // '<value name="IF0">' +
  //   // '<block ' +
  //   // 'movable="false" ' +
  //   // 'type="empty_cell">'+
  //   // '</block>'+
  //   // '</value>'+
  //   // '</block>'+

  //   // '<block type="controls_if">'+
  //   // '<mutation else="1"></mutation>' +
  //   // '<value name="IF0">' +
  //   // '<block ' +
  //   // 'movable="false" ' +
  //   // 'type="empty_cell_left">'+
  //   // '</block>'+
  //   // '</value>'+
  //   // '</block>'+

  //   // '<block type="controls_if">'+
  //   // '<mutation else="1"></mutation>' +
  //   // '<value name="IF0">' +
  //   // '<block ' +
  //   // 'movable="false" ' +
  //   // 'type="empty_cell_right">'+
  //   // '</block>'+
  //   // '</value>'+
  //   // '</block>'+

  //   '<block type="turn_left"></block>'+
  //   '<block type="turn_right"></block>'+
  //   '<block type="forward"></block>'+
  //   '</category>'+
  //   // '<category id="catVariables" custom="VARIABLE"></category>'+
  //   // '<category id="catFunctions" custom="PROCEDURE"></category>'+
  //   '</xml>'
  // );

	
  InsertBlock("start", 60, 20, false, true);  
  //Begin with coding interface hidden
  //Hide after adding Start to avoid wrong positioning
  $blockly.hide();
}


function InsertBlock(name, x, y, deletable, movable, editable){
  var newBlockStart = Blockly.Block.obtain(Blockly.mainWorkspace,name);

  newBlockStart.initSvg();
  newBlockStart.moveTo(x, y);
  newBlockStart.setDeletable(deletable);
  newBlockStart.setMovable(movable);
  
  editable = typeof editable !== 'undefined' ? editable : true;
  newBlockStart.setEditable(editable);

  newBlockStart.render();

  //Insert 2 blocks and connect them in workspace
  //var newBlock1 = Blockly.Block.obtain(Blockly.mainWorkspace,"repeat_until");
  //newBlock1.initSvg();
  //newBlock1.render();
  //newBlock1.moveTo(80,100);
  //
  //var newBlock2 = Blockly.Block.obtain(Blockly.mainWorkspace,"obstacle");
  //newBlock2.initSvg();
  //newBlock2.render();
  //newBlock2.moveTo(100,100);
  //
  //newBlock1.getConnections_()[2].connect(newBlock2.getConnections_()[0]);
}


//Select blocks from flyout (toolbox)
function getFlyoutBlock(blockType){
    var blocks = Blockly.mainWorkspace.flyout_.workspace_.topBlocks_;
    for (var i = 0; i < blocks.length; i++) {
      if(blocks[i].type == blockType){
        return blocks[i];
      }
    }
    return false;
};

function disableFlyoutBlock(blockType){
    var block = getFlyoutBlock(blockType);
    if(block){
      block.setDisabled(true);
    }else{
      console.log("Block not found in Flyout");
    }
}

// API FOR BLOCKLY
//Phaser must expose player
function Walk(){
  
}

function Forward(){
  console.log("Inside Forward");
  player.forward();
}

function TurnRight(){
	console.log("Inside TurnRight");
  // player.rotation += Math.PI/2;
  player.rotate(Math.PI/2);
}

function TurnLeft(){	
  console.log("Inside TurnLeft");
  // player.rotation -= Math.PI/2;
  player.rotate(-Math.PI/2);
	// setTimeout(stepCode, 500);
}

function Jump(){
  player.jump();
}

function LongJump(){
  player.long_jump();
}

function SuperJump(){
  player.super_jump();
};