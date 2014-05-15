/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var ContainerNodeMixin = require('../../mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../mixins/LiveNodeMixin');

var NavMenuNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        LiveNodeMixin
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
        ContainerNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        return (
            <div className="node">
                <span className="node__title">{ this.state.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } app={ this.props.app }/>
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