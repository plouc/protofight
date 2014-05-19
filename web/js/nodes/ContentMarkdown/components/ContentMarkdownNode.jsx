/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');
var marked        = require('marked');

/**
 * Content markdown node.
 */
var ContentMarkdownNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div dangerouslySetInnerHTML={{ __html: marked(this.state.node.settings.content) }}>
            </div>
        );
    }
});

module.exports = ContentMarkdownNode;