/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['obstacle'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(260);
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel("purple circle"), "OBSTACLE")
            //.appendField(new Blockly.FieldImage("../images/PurpleCircle.png", 15, 15, "*"))
            ;
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('');
    }
};

Blockly.JavaScript['obstacle'] = function(block) {
    var text_obstacle = block.getFieldValue('OBSTACLE');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.

    //var code = 'TargetReached();\n';
    var code =
            'ObstacleBlock()';
    return [code, Blockly.JavaScript.ORDER_NONE];
};