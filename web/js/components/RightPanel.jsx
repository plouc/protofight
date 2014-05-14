/** @jsx React.DOM */

'use strict';

var React     = require('react');
var NodeTypes = require('./NodeTypes.jsx').NodeTypes;

var RightPanel = React.createClass({
    getInitialState: function () {
        return {
            closed: false
        };
    },

    _onToggleClick: function (e) {
        this.setState({
            closed: !this.state.closed
        });
    },

    render: function () {
        var state = this.state.closed ? 'closed' : 'opened';

        return (
            <aside className="aside aside--right" data-state={ state }>
                <h2>Components</h2>
                <span className="aside__toggle aside__toggle--right" onClick={ this._onToggleClick }>
                    <i className="fa fa-angle-left"></i>
                    <i className="fa fa-angle-right"></i>
                </span>
                <NodeTypes app={ this.props.app } />
            </aside>
        );
    }
});

module.exports = RightPanel;