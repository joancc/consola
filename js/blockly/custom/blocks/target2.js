/**
 * Created by Joan on 12/7/2014.
 */
/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['target2'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
      //.appendField(new Blockly.FieldTextInput("red circle"), "TARGET")
      .appendField(new Blockly.FieldLabel("green circle"), "TARGET")
      //.appendField(new Blockly.FieldImage("../images/RedCircle.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setTooltip('');
  }
};

Blockly.JavaScript['target2'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
  // var argument0 = Blockly.JavaScript.valueToCode(block, 'FIND',
  //     Blockly.JavaScript.ORDER_NONE) || '\'\'';
  // var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
  //     Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code =
    'TargetBlock()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
