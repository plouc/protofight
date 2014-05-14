/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
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
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } />
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});
exports.NavMenuEditNode = NavMenuEditNode;