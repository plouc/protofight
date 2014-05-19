/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');

/**
 * Content code node.
 */
var ContentCodeNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.props.node.settings.content }</pre>
        );
    }
});

module.exports = ContentCodeNode;