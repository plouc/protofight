/** @jsx React.DOM */

'use strict';

var React       = require('react');
var NodeActions = require('../actions/NodeActions');

var NodeTypeSelector = React.createClass({
    render: function () {

        var Protofight = require('../lib/Protofight').Protofight;

        var children = [];
        Protofight.nodeTypes.forEach(function (type) {
            children.push(<NodeTypeSelectorItem  key={ type.type } node={ this.props.node } type={ type } />);
        }.bind(this));

        return (
            <div className="node-type-selector">
                <span className="button button--s" onClick={ this.onTypeClick }>
                    <i className="fa fa-plus" />
                </span>
                <div>{ children }</div>
            </div>
        );
    }
});

var NodeTypeSelectorItem = React.createClass({
    onTypeClick: function (e) {
        e.preventDefault();

        NodeActions.createChildNode(this.props.node, this.props.type);
    },

    render: function () {
        return (
            <a onClick={ this.onTypeClick }>{ this.props.type.name }</a>
        );
    }
});

module.exports = NodeTypeSelector;