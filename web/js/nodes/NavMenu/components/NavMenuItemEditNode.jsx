/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');


var NavMenuItemEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    onSubmit: function (e) {
        e.preventDefault();

        var values = {
            label: this.refs.label.getDOMNode().value,
            node:  this.refs.node.getDOMNode().value
        };
        this.props.node.settings = values;
        this.props.app.save(this.props.node);

        return false;
    },

    render: function () {
        if (!this.props.node.settings) {
            this.props.node.settings = {
                label: '',
                node:  ''
            };
        }

        var classes  = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }: { this.props.node.settings.label }</span>
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
                    <form onSubmit={ this.onSubmit }>
                        <p>
                            <label>Label</label>
                            <input type="text" defaultValue={ this.props.node.settings.label } ref="label" />
                        </p>
                        <p>
                            <label>Node</label>
                            <input type="text" defaultValue={ this.props.node.settings.node } ref="node" />
                        </p>
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

module.exports = NavMenuItemEditNode;