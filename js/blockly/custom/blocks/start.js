/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['start'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(260);
        this.appendDummyInput()
            .appendField("On Start");
        this.setPreviousStatement(false);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.JavaScript['start'] = function(block) {
    var text_obstacle = block.getFieldValue('START');
    // TODO: Assemble JavaScript into code variable.
    var code = 'if(true){window.start = true;};\n';
    // TODO: Change ORDER_NONE to the correct strength.

    return [code, Blockly.JavaScript.ORDER_NONE];
};

