'use strict';

var NodeConstants = require('../../constants/NodeConstants');

module.exports = {
    _onDeleteClick: function (e) {
        e.preventDefault();
        this.props.app.emit(NodeConstants.NODE_DESTROY, this.props.node);
    }
};