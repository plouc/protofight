/** @jsx React.DOM */

'use strict';

var React              = require('react');
var ContainerNodeMixin = require('../../core/mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');

var LayoutRowNode = React.createClass({
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
            <div className="grid__row">{ children }</div>
            );
    }
});

module.exports = LayoutRowNode;