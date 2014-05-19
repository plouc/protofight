/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');


var NavBreadcrumbsItemNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <span className="breadcrumbs__item" key={ this.props.node._id }>{ this.props.node.name }</span>
        );
    }
});

module.exports = NavBreadcrumbsItemNode;