/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['empty_cell_right'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      //.appendField(new Blockly.FieldImage("../images/WhiteSpace.png", 15, 15, "*"))
      .appendField(new Blockly.FieldLabel("path right"), "EMPTYCELLRIGHT");
    //.appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setTooltip('');
  }
};

Blockly.JavaScript['empty_cell_right'] = function(block) {
  var text_obstacle = block.getFieldValue('EMPTYCELLRIGHT');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.

  //var code = 'TargetReached();\n';

  var code =
    'EmptyCellBlockRight()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


