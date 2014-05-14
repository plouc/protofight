/** @jsx React.DOM */

'use strict';

var React      = require('react');
var protofight;

var NavMenuNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        protofight = require('../../../lib/Protofight').protofight();

        var children = protofight.buildChildNodeList(this.props.node, 'view');
        return (
            <div className="menu">{ children }</div>
        );
    }
});

exports.NavMenuNode = NavMenuNode;



var NavMenuEditNode = React.createClass({
    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        protofight = require('../../../lib/Protofight').protofight();

        var children = protofight.buildChildNodeList(this.props.node, 'edit');

        return (
            <div className="node">
                <span class="node__title">{ this.props.node.name }</span>
                <div>{ children }</div>
            </div>
        );
    }
});

exports.NavMenuEditNode = NavMenuEditNode;