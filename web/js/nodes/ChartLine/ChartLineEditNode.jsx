/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../core/mixins/EditableNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');
var ContainerNodeMixin = require('../../core/mixins/ContainerNodeMixin');
var RemovableNodeMixin = require('../../core/mixins/RemovableNodeMixin');
var NodeMeta           = require('../../core/components/NodeMeta.jsx');
var NodeTypeSelector   = require('../../core/components/NodeTypeSelector.jsx');
var d3                 = require('d3');
var nv                 = require('../../core/nvd3');

var ChartLineEditNode = React.createClass({
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



        return false;
    },

    render: function () {
        var classes  = 'node';
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
                            <label>Margin left</label>
                            <input type="text" defaultValue={ this.props.node.settings.marginLeft } />

                            <label>Margin right</label>
                            <input type="text" defaultValue={ this.props.node.settings.marginRight } />
                        </p>
                        <p>
                            <label>Show X axis</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showXaxis } />

                            <label>Show Y axis</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.showYaxis } />
                        </p>

                        <p>
                            <label>Use interactive guideline</label>
                            <input type="checkbox" defaultValue={ this.props.node.settings.useInteractiveGuideline } />
                        </p>
                        <p>
                            <label>Transition duration</label>
                            <input type="text" defaultValue={ this.props.node.settings.transitionDuration } />
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

module.exports = ChartLineEditNode;