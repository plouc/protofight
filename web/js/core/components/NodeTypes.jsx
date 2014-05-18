/** @jsx React.DOM */

'use strict';

var React        = require('react');
var NodeRegistry = require('../registry/NodeRegistry');

var NodeType = React.createClass({
    onClick: function (e) {
        e.preventDefault();

        this.props.app.create(this.props.data);
    },

    render: function () {
        return (
            <div onClick={ this.onClick }>{ this.props.data.name }</div>
        );
    }
});
exports.NodeType = NodeType;



var NodeTypes = React.createClass({
    getInitialState: function() {
        return {
            nodeTypes: NodeRegistry.getTypes(['content.page'])
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