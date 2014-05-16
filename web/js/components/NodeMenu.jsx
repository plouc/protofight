/** @jsx React.DOM */

'use strict';

var React         = require('react');
var classSet      = require('react-addons').classSet;
var NodeConstants = require('../constants/NodeConstants');



var NodeMenu = React.createClass({
    render: function () {
        var children = [];
        this.props.nodes.forEach(function (node) {
            children.push(<NodeMenuItem key={ node._id } name={ node.name } app={ this.props.app } />)
        }.bind(this));
        return (
            <div>{ children }</div>
        );
    }
});
exports.NodeMenu = NodeMenu;



var NodeMenuItem = React.createClass({
    getInitialState: function() {
        return {
            active: false
        };
    },

    _onNodeFetched: function (node) {
        this.setState({
            active: (node._id === this.props.key)
        });
    },

    componentWillMount: function () {
        this.props.app.on(NodeConstants.NODE_FETCHED, this._onNodeFetched);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener(NodeConstants.NODE_FETCHED, this._onNodeFetched);
    },

    handleClick: function (e) {
        e.preventDefault();
        this.props.app.emit(NodeConstants.NODE_FETCH, this.props.key);
    },

    render: function () {
        var classes = classSet({
            'node-menu__item': true,
            '_is_active':      this.state.active
        });
        return (
            <a className={classes} onClick={ this.handleClick }>{ this.props.name }</a>
        );
    }
});
exports.NodeMenuItem = NodeMenuItem;