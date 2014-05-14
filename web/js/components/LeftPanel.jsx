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

    onToggleClick: function (e) {
        this.setState({
            closed: !this.state.closed
        });
    },

    componentDidMount: function () {
    },

    render: function () {
        var classes = 'aside aside--left';
        if (this.state.closed) {
            classes += ' aside--left--closed';
        }

        return (
            <aside className={ classes }>
                <h2>Nodes</h2>
                <span className="aside__toggle aside__toggle--left" onClick={ this.onToggleClick }>
                    <i className="fa fa-angle-left"></i>
                    <i className="fa fa-angle-right"></i>
                </span>
                <NodeMenu nodes={ this.props.nodes } nodeClickedHandler={ this.props.nodeClickedHandler } />
            </aside>
        )
    }
});

module.exports = LeftPanel;