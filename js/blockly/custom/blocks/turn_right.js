/**
 * Created by Joan on 1/9/2015.
 */
/**
 * Created by Joan on 1/9/2015.
 */
Blockly.Blocks['turn_right'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      .appendField("turn right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  // var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
  //     Blockly.JavaScript.ORDER_NONE) || '\'\'';
  // var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
  //     Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code = 'TurnRight();\n';
  return code;
};