/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../../core/mixins/LiveNodeMixin');

var DataJsonApiCallNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    componentWillMount: function () {
    },

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.state.node.settings.httpMethod } { this.state.node.settings.url }</pre>
        );
    }
});

module.exports = DataJsonApiCallNode;