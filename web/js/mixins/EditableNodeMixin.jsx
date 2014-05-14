'use strict';

module.exports = {
    getInitialState: function () {
        return {
            edit: false
        };
    },

    onEditClick: function () {
        this.setState({
            edit: !this.state.edit
        });
    }
};