/**
 * Created by Joan on 12/7/2014.
 */
Blockly.Blocks['repeat_until'] = {
    /**
     * Block for 'do while/until' loop.
     * @this Blockly.Block
     */
    init: function() {
        var OPERATORS =
            [
                //[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
                [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
        this.setColour(120);
        this.appendValueInput('BOOL')
            .setCheck('Boolean')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            };
            return TOOLTIPS[op];
        });
    }
};

Blockly.JavaScript['repeat_until'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
            until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
                Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = '!' + argument0;
    }
    //return 'while (' + argument0 + ') {\n' + branch + '}\n';
    return 'while (' + argument0 + ' && (player.x < canvas.width)) {\n' + branch + '}\n';
};