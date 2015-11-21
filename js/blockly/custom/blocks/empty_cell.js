/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['empty_cell'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      //.appendField(new Blockly.FieldImage("../images/WhiteSpace.png", 15, 15, "*"))
      .appendField(new Blockly.FieldLabel("path in front"), "EMPTYCELL");
    //.appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setTooltip('');
  }
};

Blockly.JavaScript['empty_cell'] = function(block) {
  var text_obstacle = block.getFieldValue('EMPTYCELL');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.

  //var code = 'TargetReached();\n';

  var code =
    'EmptyCellBlock()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

