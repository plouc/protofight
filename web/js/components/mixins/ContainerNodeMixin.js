'use strict';

var NodeComponentQualifier = require('../../lib/NodeComponentQualifier');

module.exports = {
    getChildrenNodes: function (mode) {
        return NodeComponentQualifier.getChildNodesComponents(this.state.node, mode, this.props.app);
    }
};