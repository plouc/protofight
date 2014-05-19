'use strict';

var NodeRegistry = require('../registry/NodeRegistry');

module.exports = {
    getInitialState: function () {
        return {
            childrenVisible: true
        };
    },

    getChildrenNodes: function (mode) {
        var children = NodeRegistry.getNodeChildComponents(this.props.node, mode, this.props.app);

        return children;
    },

    _onToggleChildrenClick: function (e) {
        e.preventDefault();

        this.setState({
            childrenVisible: !this.state.childrenVisible
        });
    }
};