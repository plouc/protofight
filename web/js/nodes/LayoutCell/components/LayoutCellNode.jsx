/** @jsx React.DOM */

'use strict';

var React              = require('react');
var ContainerNodeMixin = require('../../../core/mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../../core/mixins/LiveNodeMixin');


var LayoutCellNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        LiveNodeMixin
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

module.exports = LayoutCellNode;