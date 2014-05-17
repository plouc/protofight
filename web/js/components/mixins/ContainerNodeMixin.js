'use strict';

var NodeComponentQualifier = require('../../lib/NodeComponentQualifier');

module.exports = {
    getChildrenNodes: function (mode) {
        var children = NodeComponentQualifier.getChildNodesComponents(this.props.node, mode, this.props.app);

        return children;
    }
};