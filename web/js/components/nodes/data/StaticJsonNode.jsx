/** @jsx React.DOM */

'use strict';

var React = require('react');

var DataStaticJsonNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.props.settings.content }</pre>
        );
    }
});

exports.DataStaticJsonNode = DataStaticJsonNode;