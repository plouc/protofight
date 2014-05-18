'use strict';

var NodeConstants = require('../constants/NodeConstants');

module.exports = {
    getInitialState: function () {
        return {
            node: this.props.node
        };
    },

    _onNodeUpdate: function (node) {
        if (node._id === this.props.node._id) {
            this.setState({
                node: node
            });
        }
    },

    componentWillMount: function () {
        this.props.app.on(NodeConstants.NODE_UPDATE, this._onNodeUpdate);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener(NodeConstants.NODE_UPDATE, this._onNodeUpdate);
    }
};