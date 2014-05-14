'use strict';

module.exports = {
    getInitialState: function () {
        return {
            edit: false
        };
    },

    onEditClick: function (e) {
        this.setState({
            edit: !this.state.edit
        });
    }
};