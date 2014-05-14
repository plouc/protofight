/** @jsx React.DOM */

'use strict';

var React              = require('react');
var ContainerNodeMixin = require('../../../mixins/ContainerNodeMixin.jsx');

var NavMenuNode = React.createClass({
    mixins: [
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('view');

        return (
            <div className="menu">{ children }</div>
        );
    }
});
exports.NavMenuNode = NavMenuNode;



var NavMenuEditNode = React.createClass({
    mixins: [
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        return (
            <div className="node">
                <span className="node__title">{ this.props.node.name }</span>
                <div>{ children }</div>
            </div>
        );
    }
});
exports.NavMenuEditNode = NavMenuEditNode;