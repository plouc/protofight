/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../mixins/EditableNodeMixin');
var ContainerNodeMixin = require('../../mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../mixins/LiveNodeMixin');

var ContentPageNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('view');

        return (
            <div>{ children }</div>
        );
    }
});
exports.ContentPageNode = ContentPageNode;



var ContentPageEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
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
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <label>Name</label>
                            <input type="text" defaultValue={ this.props.node.name } ref="name" />
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
exports.ContentPageEditNode = ContentPageEditNode;