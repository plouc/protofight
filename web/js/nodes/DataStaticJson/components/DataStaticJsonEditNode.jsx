/** @jsx React.DOM */

'use strict';

var React              = require('react');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var NodeConstants      = require('../../../core/constants/NodeConstants');


var DataStaticJsonEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
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
                <span className="node__title">{ this.state.node.name }</span>
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

module.exports = DataStaticJsonEditNode;