/** @jsx React.DOM */

'use strict';

var React = require('react');

var ContentContainerNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div>{ children }</div>
        );
    }
});

exports.ContentContainerNode = ContentContainerNode;



var ContentContainerEditNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'edit');
        return (
            <div>{ children }</div>
        );
    }
});

exports.ContentContainerEditNode = ContentContainerEditNode;