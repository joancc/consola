var testObject;

function blocklyLoaded(blockly) {
  // Called once Blockly is fully loaded.
  window.Blockly = blockly;
}
var output;
function executeBlockly(){
  var myCode = Blockly.JavaScript.workspaceToCode();
  if (myCode !== '') {
    output = myCode.split('\n');
    console.log( output );
    console.log( output.length );

    //Check if there is more than one stack of blocks and give a warning
    var multipleStacks = false;
    for(var i = 0; i < output.length-1; i++){
      console.log(output[i]);
      console.log(output[i] == "");
      if(output[i] == ""){
        multipleStacks = true;
        $("#multipleStacksModal").modal("show");
        return;
      }
    }

    parseCode();
    
    // myInterpreter.step(); //Verifies Start block
    // myInterpreter.step(); //Runs first user block
    // console.log("My code:");
    // console.log(myCode);
    
    

    nextStep();
    //eval(myCode);

    //Parse save
    //console.log("Executed code");
    //console.log(this.id);
    //if(!$.isEmptyObject(CURRENT_USER)){
    //  var CodeUsed = Parse.Object.extend("CodeUsed");
    //  var codeUsed = new CodeUsed();
    //  codeUsed.set("Code", myCode);
    //  codeUsed.set("Level", currentLevel);
    //  codeUsed.set("time", new Date());
    //  codeUsed.set("UserId", CURRENT_USER.id);
    //  codeUsed.save();
    //}

    //setTimeout(function()
    //{
    //  CheckSuccess();
    //  universalAnimationCounter = 0;
    //}, animationSpeed*universalAnimationCounter); //Wait for animations to complete
    ////universalAnimationCounter = 0;
  }else{
    alert("Code is empty");

    //Phaser
    parserButton.visible = true;


    // CheckSuccess();
  }
}

var myInterpreter = null;

//API for external calls for Custom Blocks through the interpreter
function initApi(interpreter, scope) {
  // Add an API function for the alert() block.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for displaying output from block.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(displayBlockOutput(text));
  };
  interpreter.setProperty(scope, 'displayBlockOutput',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the Walk() block.
  wrapper = function() {
    return interpreter.createPrimitive(Walk());
  };
  interpreter.setProperty(scope, 'Walk',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the forward() block.
  wrapper = function() {
    return interpreter.createPrimitive(Forward());
  };
  interpreter.setProperty(scope, 'Forward',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the turn_right() block.
  wrapper = function() {
    return interpreter.createPrimitive(TurnRight());
  };
  interpreter.setProperty(scope, 'TurnRight',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the turn_left() block.
  wrapper = function() {
    return interpreter.createPrimitive(TurnLeft());
  };
  interpreter.setProperty(scope, 'TurnLeft',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the Jump() block.
  wrapper = function() {
    return interpreter.createPrimitive(Jump());
  };
  interpreter.setProperty(scope, 'Jump',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the SuperJump() block.
  wrapper = function() {
    return interpreter.createPrimitive(SuperJump());
  };
  interpreter.setProperty(scope, 'SuperJump',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the LongJump() block.
  wrapper = function() {
    return interpreter.createPrimitive(LongJump());
  };
  interpreter.setProperty(scope, 'LongJump',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the Target block.
  wrapper = function() {
    return interpreter.createPrimitive(TargetBlock());
  };
  interpreter.setProperty(scope, 'TargetBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the Obstacle block.
  wrapper = function() {
    return interpreter.createPrimitive(ObstacleBlock());
  };
  interpreter.setProperty(scope, 'ObstacleBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the StackedObstacle block.
  wrapper = function() {
    return interpreter.createPrimitive(StackedObstacleBlock());
  };
  interpreter.setProperty(scope, 'StackedObstacleBlock',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the DoubleObstacle block.
  wrapper = function() {
    return interpreter.createPrimitive(DoubleObstacleBlock());
  };
  interpreter.setProperty(scope, 'DoubleObstacleBlock',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the Empty block.
  wrapper = function() {
    return interpreter.createPrimitive(EmptyBlock());
  };
  interpreter.setProperty(scope, 'EmptyBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the EmptyCell block.
  wrapper = function() {
    return interpreter.createPrimitive(EmptyCellBlock());
  };
  interpreter.setProperty(scope, 'EmptyCellBlock',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the EmptyCellBlockLeft block.
  wrapper = function() {
    return interpreter.createPrimitive(EmptyCellBlockLeft());
  };
  interpreter.setProperty(scope, 'EmptyCellBlockLeft',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the EmptyCellBlockRight block.
  wrapper = function() {
    return interpreter.createPrimitive(EmptyCellBlockRight());
  };
  interpreter.setProperty(scope, 'EmptyCellBlockRight',
    interpreter.createNativeFunction(wrapper));

  // Add an API function for the CheckSuccess() function. This funciton is added manually inside parseCode()
  wrapper = function() {
    return interpreter.createPrimitive(CheckSuccess());
  };
  interpreter.setProperty(scope, 'CheckSuccess',
      interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;
function highlightBlock(id) {
  Blockly.mainWorkspace.highlightBlock(id);
  highlightPause = true;

  var currentBlock = Blockly.mainWorkspace.getBlockById(id);
  
  // if (currentBlock.type == 'controls_repeat') {
  //   testObject = myInterpreter.getScope();
  //   var countNum = myInterpreter.getScope().properties["countFor"+id].data;
  //   var repeatLoopComplete = myInterpreter.getScope().properties["repeatLoopCompleteFor"+id].data;
  //   var repeatsNum = currentBlock.getFieldValue('TIMES');

  //   var count = myInterpreter.getScope().properties[countNum].data;
  //   if (count != undefined) {
  //     console.log('count: ' + count);
  //     if(count+2 <= repeatsNum){
  //       displayBlockOutput(currentBlock, count+2+"/"+repeatsNum);
  //     }else{
  //       if(repeatLoopComplete){
  //         myInterpreter.getScope().properties["repeatLoopCompleteFor"+id].data = false;
  //         displayBlockOutput(currentBlock, "1/"+repeatsNum);
  //       }else{
  //         myInterpreter.getScope().properties["repeatLoopCompleteFor"+id].data = true;
  //       }
  //     }
  //   }else{
  //     displayBlockOutput(currentBlock, "1/"+repeatsNum);
  //   }
  // }

  // if (currentBlock.type == 'controls_whileUntil') {
  //   //Get the input block for the loop
  //   var inputBlock = currentBlock.getChildren()[0];
  //   console.log(inputBlock);
  //   //Generate code for the input block and evaluate it
  //   var inputBlockCode = Blockly.JavaScript.blockToCode(inputBlock)[0];
  //   console.log(inputBlockCode);
  //   var controls_whileUntil_value = eval(inputBlockCode);
  //   console.log(controls_whileUntil_value);
  //   displayBlockOutput(currentBlock, controls_whileUntil_value);
  // }

  // if (currentBlock.type == 'controls_if') {
  //   //Get the input block for the if block
  //   var inputBlock = currentBlock.getChildren()[0];
  //   console.log(inputBlock);
  //   //Generate code for the input block and evaluate it
  //   var inputBlockCode = Blockly.JavaScript.blockToCode(inputBlock)[0];
  //   console.log(inputBlockCode);
  //   var controls_if_value = eval(inputBlockCode);
  //   console.log(controls_if_value);
  //   displayBlockOutput(currentBlock, controls_if_value);
  // }

  // if (currentBlock.type == 'variables_set') {
  //   var n = myInterpreter.getScope().properties.n.data;
  //   alert(n);
  //   if (n != undefined) {
  //     console.log('n: ' + n);
  //     displayBlockOutput(currentBlock, n);
  //   }
  // }
}

function parseCode() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');

  var code = Blockly.JavaScript.workspaceToCode();
  console.log(code);
  // code += "CheckSuccess();";
  myInterpreter = new Interpreter(code, initApi);

  //alert('Ready to execute this code:\n\n' + code);
  //document.getElementById('stepButton').disabled = '';
  highlightPause = false;
  Blockly.mainWorkspace.traceOn(true);
  Blockly.mainWorkspace.highlightBlock(null);
}

function nextStep() {  
  if (myInterpreter.step()) {
    // animationsArray.push(setTimeout(nextStep, 50));
    console.log("Next step wait time: ");
    console.log(myInterpreter);
    window.setTimeout(nextStep, 50);
  }else{
    Consola.Global.blocklyExecuted = true;
    parserButton.visible = true;
    runButton.visible = true;
  }
}

//USE TO PAUSE EXECUTION ON HIGHLIGHTED BLOCK
function stepCode() {
 try {
   var ok = myInterpreter.step();
 } finally {
   if (!ok) {
     // Program complete, no more code to execute.
     //document.getElementById('stepButton').disabled = 'disabled';
     return;
   }
 }
 if (highlightPause) {
   // A block has been highlighted.  Pause execution here.
   highlightPause = false;
 } else {
   // Keep executing until a highlight statement is reached.
   stepCode();
 }
}