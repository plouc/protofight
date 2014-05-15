/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../mixins/LiveNodeMixin');

var DataStaticJsonNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.state.node.settings.content }</pre>
        );
    }
});

exports.DataStaticJsonNode = DataStaticJsonNode;