/** @jsx React.DOM */

'use strict';

var React = require('react');

exports.NodeMenu = React.createClass({
    render: function () {
        var children = [];
        this.props.nodes.forEach(function (node) {
            children.push(<NodeMenuItem key={ node._id } name={ node.name } nodeClickedHandler={ this.props.nodeClickedHandler } />)
        }.bind(this));
        return (
            <div>{ children }</div>
        );
    }
});

exports.NodeMenuItem = React.createClass({
    getInitialState: function() {
        return {
            active: false
        };
    },

    handleClick: function (e) {
        e.preventDefault();
        this.props.nodeClickedHandler(this, e);

        this.setState({
            active: !this.state.active
        });
    },

    render: function () {
        var cx = React.addons.classSet;
        var classes = cx({
            'node-menu__item': true,
            '_is_active':      this.state.active
        });
        return (
            <a className={classes} onClick={ this.handleClick }>{ this.props.name }</a>
        );
    }
});