/** @jsx React.DOM */

var React = require('react');

var ContentContainerNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div>{ children }</div>
        );
    }
});

var ContentContainerEditNode = React.createClass({
    propTypes: {
        app:  React.PropTypes.instanceOf(Protofight).isRequired,
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = protofight.buildChildNodeList(this.props.node, 'edit');
        return (
            <div>{ children }</div>
        );
    }
});