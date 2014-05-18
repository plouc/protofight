/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../core/components/NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../core/mixins/EditableNodeMixin');
var ContainerNodeMixin = require('../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');


var NavBreadcrumbsEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    handleSubmit: function () {
        return false;
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } app={ this.props.app }/>
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning">cancel</span>
                        </p>
                    </form>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});

module.exports = NavBreadcrumbsEditNode;