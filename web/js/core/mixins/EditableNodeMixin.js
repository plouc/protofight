'use strict';

module.exports = {
    getInitialState: function () {
        return {
            edit: false
        };
    },

    _onCancelEditClick: function (e) {
        this.setState({
            edit: false
        });
    },

    onEditClick: function (e) {
        this.setState({
            edit: !this.state.edit
        });
    }
};