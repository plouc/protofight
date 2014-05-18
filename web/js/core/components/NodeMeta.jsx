/** @jsx React.DOM */

'use strict';

var React = require('react');

var NodeMeta = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <ul className="node__meta">
                <li>id: <strong>{ this.props.node._id }</strong></li>
                <li>type: <strong>{ this.props.node.type }</strong></li>
            </ul>
        );
    }
});
module.exports = NodeMeta;