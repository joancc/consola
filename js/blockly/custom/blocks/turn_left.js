/**
 * Created by Joan on 1/9/2015.
 */
Blockly.Blocks['turn_left'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      .appendField("turn left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['turn_left'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  // var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
  //     Blockly.JavaScript.ORDER_NONE) || '\'\'';
  // var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
  //     Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code = 'TurnLeft();\n';
  return code;
};