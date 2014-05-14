'use strict';

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
        this.props.app.on('node.update', this._onNodeUpdate);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener('node.update', this._onNodeUpdate);
    }
};