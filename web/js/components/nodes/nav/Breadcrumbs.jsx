/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../../mixins/EditableNodeMixin.jsx');
var ContainerNodeMixin = require('../../../mixins/ContainerNodeMixin.jsx');

var NavBreadcrumbsNode = React.createClass({
    mixins: [
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('view');

        return (
            <div className="breadcrumbs">{ children }</div>
        );
    }
});
exports.NavBreadcrumbsNode = NavBreadcrumbsNode;



var NavBreadcrumbsEditNode = React.createClass({
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
        var children = this.getChildrenNodes('edit');

        var classes = 'node';
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
exports.NavBreadcrumbsEditNode = NavBreadcrumbsEditNode;



var NavBreadcrumbsItemNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <span className="breadcrumbs__item" key={ this.props.node._id }>{ this.props.node.name }</span>
        );
    }
});
exports.NavBreadcrumbsItemNode = NavBreadcrumbsItemNode;



var NavBreadcrumbsItemEditNode = React.createClass({
    mixins: [
        EditableNodeMixin
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
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning">cancel</span>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
});
exports.NavBreadcrumbsItemEditNode = NavBreadcrumbsItemEditNode;