/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');

/**
 * Content text node.
 */
var ContentTextNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div>{ this.props.node.settings.content }</div>
        );
    }
});

module.exports = ContentTextNode;