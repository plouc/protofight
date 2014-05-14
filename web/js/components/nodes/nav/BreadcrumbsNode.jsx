/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../../mixins/EditableNodeMixin.jsx');
var ContainerNodeMixin = require('../../../mixins/ContainerNodeMixin.jsx');

var NavBreadcrumbsNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            items: []
        };
    },

    componentDidMount: function() {
        this.props.node.getItems()
            .done(function (items) {
                var nodes = [];
                for (var id in items) {
                    var item = items[id];
                    nodes.push(<span className="breadcrumbs__item" key={ item._id }>{ item.name }</span>);
                }

                this.setState({
                    items: nodes
                });
            }.bind(this));
    },

    render: function () {
        return (
            <div className="breadcrumbs">{ this.state.items }</div>
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