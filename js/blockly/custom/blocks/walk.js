// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
Blockly.Blocks['walk'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Walk");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['walk'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  // var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
  //     Blockly.JavaScript.ORDER_NONE) || '\'\'';
  // var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
  //     Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code = 'Walk();\n';
  return code;
};