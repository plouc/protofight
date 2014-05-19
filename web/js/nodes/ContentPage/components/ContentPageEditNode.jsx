/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var ContainerNodeMixin = require('../../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');
var NodeTypeSelector   = require('../../../core/components/NodeTypeSelector.jsx');
var NodeMeta           = require('../../../core/components/NodeMeta.jsx');


var ContentPageEditNode = React.createClass({
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
        };

        this.state.node.name = this.refs.name.getDOMNode().value;
        this.state.node.settings = settings;
        this.props.app.save(this.state.node);

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
                <span className="node__title">{ this.state.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.state.node } app={ this.props.app }/>
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

module.exports = ContentPageEditNode;