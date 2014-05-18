/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../core/mixins/EditableNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');
var ContainerNodeMixin = require('../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../core/mixins/RemovableNodeMixin');
var NodeMeta           = require('../../core/components/NodeMeta.jsx');
var NodeTypeSelector   = require('../../core/components/NodeTypeSelector.jsx');


var ChartPieEditNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        EditableNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            showLabel:  this.refs.showLabel.getDOMNode().value,
            showLegend: this.refs.showLegend.getDOMNode().value
        };

        return false;
    },

    render: function () {
        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        if (!this.props.node.settings) {
            this.props.node.settings = {};
        }

        var children = this.getChildrenNodes('edit');

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } app={ this.props.app } />
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
                            <label>Show label</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showLabel } ref="showLabel" />
                        </p>
                        <p>
                            <label>Show legend</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showLegend } ref="showLegend" />
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

module.exports = ChartPieEditNode;