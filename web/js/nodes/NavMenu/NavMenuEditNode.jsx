/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../core/components/NodeTypeSelector.jsx');
var ContainerNodeMixin = require('../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');


var NavMenuEditNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        RemovableNodeMixin,
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
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});

module.exports = NavMenuEditNode;