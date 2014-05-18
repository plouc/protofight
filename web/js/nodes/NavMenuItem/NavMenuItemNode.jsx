/** @jsx React.DOM */

'use strict';

var React         = require('react');
var LiveNodeMixin = require('../../core/mixins/LiveNodeMixin');


var NavMenuItemNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <span className="menu__item">
                <a href="#">{ this.props.node.settings.label }</a>
            </span>
        );
    }
});

module.exports = NavMenuItemNode;