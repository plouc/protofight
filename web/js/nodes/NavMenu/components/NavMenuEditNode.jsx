/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../../core/components/NodeTypeSelector.jsx');
var ContainerNodeMixin = require('../../../core/mixins/ContainerNodeMixin');
var EditableNodeMixin  = require('../../../core/mixins/EditableNodeMixin');
var RemovableNodeMixin = require('../../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');
var NodeMeta           = require('../../../core/components/NodeMeta.jsx');


var NavMenuEditNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        RemovableNodeMixin,
        EditableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }
        if (this.state.childrenVisible) {
            classes += ' node--children-on';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.state.node.name } { this.state.node.nodes.length } item(s)</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } app={ this.props.app }/>
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                    <span className="button button--s node__toggle-children" onClick={ this._onToggleChildrenClick }>
                        <i className="fa fa-chevron-up"></i>
                        <i className="fa fa-chevron-down"></i>
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
                <div className="node__children">
                    { children }
                </div>
            </div>
        );
    }
});

module.exports = NavMenuEditNode;