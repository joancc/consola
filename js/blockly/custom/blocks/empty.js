/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['empty'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(260);
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("../images/WhiteSpace.png", 15, 15, "*"))
            .appendField(new Blockly.FieldLabel("path ahead"), "EMPTY");
            //.appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('');
    }
};

Blockly.JavaScript['empty'] = function(block) {
    var text_obstacle = block.getFieldValue('EMPTY');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.

    //var code = 'TargetReached();\n';

    var code =
        'EmptyBlock()';
    return [code, Blockly.JavaScript.ORDER_NONE];
};
