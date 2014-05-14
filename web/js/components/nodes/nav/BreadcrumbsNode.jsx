/** @jsx React.DOM */

'use strict';

var React      = require('react');
var Protofight = require('../../../lib/Protofight');

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