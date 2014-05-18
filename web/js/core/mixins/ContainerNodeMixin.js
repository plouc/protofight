'use strict';

var NodeRegistry = require('../registry/NodeRegistry');

module.exports = {
    getChildrenNodes: function (mode) {
        var children = NodeRegistry.getNodeChildComponents(this.props.node, mode, this.props.app);

        return children;
    }
};