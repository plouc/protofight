/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var ContainerNodeMixin = require('../../../core/mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');
var NodeTypeSelector   = require('../../../core/components/NodeTypeSelector.jsx');
var NodeMeta           = require('../../../core/components/NodeMeta.jsx');


var LayoutRowEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            columns: this.refs.columns.getDOMNode().value
        };

        this.props.node.settings = settings;
        this.props.node.name     = this.refs.name.getDOMNode().value;
        this.props.app.save(this.props.node);

        return false;
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        var classes  = 'node';
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
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <NodeMeta node={ this.state.node }/>
                    <form onSubmit={ this._onSubmit }>
                        <p>
                            <label>Name</label>
                            <input type="text" defaultValue={ this.state.node.name } ref="name" />
                        </p>
                        <p>
                            <label>Columns</label>
                            <input type="text" defaultValue={ this.state.node.settings.columns } ref="columns" />
                        </p>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning" onClick={ this._onCancelEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});

module.exports = LayoutRowEditNode;