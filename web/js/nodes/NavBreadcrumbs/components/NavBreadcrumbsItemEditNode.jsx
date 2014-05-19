/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../../core/components/NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var ContainerNodeMixin = require('../../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');


var NavBreadcrumbsItemEditNode = React.createClass({
    mixins: [
        LiveNodeMixin,
        EditableNodeMixin,
        RemovableNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning" onClick={ this._onCancelEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = NavBreadcrumbsItemEditNode;