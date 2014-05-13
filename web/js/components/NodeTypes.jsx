/** @jsx React.DOM */

'use strict';

var React      = require('react');
var Protofight = require('../lib/Protofight');

var NodeType = React.createClass({
    propTypes: {
        app: React.PropTypes.instanceOf(Protofight).isRequired
    },

    onClick: function (e) {
        e.preventDefault();

        this.props.app.createNode(this.props.data);
    },

    render: function () {
        return (
            <div onClick={ this.onClick }>{ this.props.data.name }</div>
        );
    }
});

exports.NodeType = NodeType;

var NodeTypes = React.createClass({
    propTypes: {
        app: React.PropTypes.instanceOf(Protofight).isRequired
    },

    getInitialState: function() {
        return {
            nodeTypes: Protofight.nodeTypes
        };
    },

    render: function () {
        var children = [];

        this.state.nodeTypes.forEach(function (type) {
            children.push(<NodeType app={ this.props.app } key={ type.type } data={ type }/>)
        }.bind(this));

        return (
            <div>{ children }</div>
        );
    }
});

exports.NodeTypes = NodeTypes;