/**
 * Created by Joan on 1/9/2015.
 */
Blockly.Blocks['forward'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      .appendField("forward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },

  onchange: function(){
    console.log("onchange for forward block");
  }
};

Blockly.JavaScript['forward'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  // var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
  //     Blockly.JavaScript.ORDER_NONE) || '\'\'';
  // var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
  //     Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code = 'Forward();\n';
  return code;
};