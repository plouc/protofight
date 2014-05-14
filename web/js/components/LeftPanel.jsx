/** @jsx React.DOM */

'use strict';

var React    = require('react');
var NodeMenu = require('./NodeMenu.jsx').NodeMenu;

var LeftPanel = React.createClass({
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
            <aside className="aside aside--left" data-state={ state }>
                <h2>Nodes</h2>
                <span className="aside__toggle aside__toggle--left" onClick={ this._onToggleClick }>
                    <i className="fa fa-angle-left"></i>
                    <i className="fa fa-angle-right"></i>
                </span>
                <NodeMenu nodes={ this.props.nodes } nodeClickedHandler={ this.props.nodeClickedHandler } />
            </aside>
        )
    }
});

module.exports = LeftPanel;