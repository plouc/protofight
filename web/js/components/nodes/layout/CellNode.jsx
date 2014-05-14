/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../../mixins/EditableNodeMixin.jsx');
var ContainerNodeMixin = require('../../../mixins/ContainerNodeMixin.jsx');


var LayoutCellNode = React.createClass({
    mixins: [
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('view');
        var classes  = 'grid__cell grid__cell--' + this.props.node.settings.columns;

        return (
            <div className={ classes }>{ children }</div>
        );
    }
});
exports.LayoutCellNode = LayoutCellNode;



var LayoutCellEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    handleSubmit: function () {
        return false;
    },

    render: function () {
        var children = this.getChildrenNodes('view');

        var classes  = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.props.node } />
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <label>Columns</label>
                            <input type="text" defaultValue={ this.props.node.settings.columns } ref="columns" />
                        </p>
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
exports.LayoutCellEditNode = LayoutCellEditNode;