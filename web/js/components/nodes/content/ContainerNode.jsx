/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../../mixins/EditableNodeMixin.jsx');
var ContainerNodeMixin = require('../../../mixins/ContainerNodeMixin.jsx');

var ContentContainerNode = React.createClass({
    mixins: [
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('view');

        return (
            <div>{ children }</div>
        );
    }
});
exports.ContentContainerNode = ContentContainerNode;



var ContentContainerEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        return (
            <div>
                <NodeTypeSelector node={ this.props.node } />
                <div>{ children }</div>
            </div>
        );
    }
});
exports.ContentContainerEditNode = ContentContainerEditNode;