/** @jsx React.DOM */

'use strict';

var React = require('react');

var ContentTextNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <p>{ this.props.node.settings.content }</p>
        );
    }
});

exports.ContentTextNode = ContentTextNode;