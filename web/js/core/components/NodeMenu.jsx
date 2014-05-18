/** @jsx React.DOM */

'use strict';

var React         = require('react');
var classSet      = require('react-addons').classSet;
var NodeConstants = require('../constants/NodeConstants');


var NodeMenu = React.createClass({
    getInitialState: function () {
        return {
            nodes: []
        };
    },

    _onNodeUpdate: function () {
        this.props.app.emit(NodeConstants.NODE_LIST_FETCH);
    },

    _onNodeListFetched: function (nodes) {
        this.setState({
            nodes: nodes
        });
    },

    componentWillMount: function () {
        this.props.app.on(NodeConstants.NODE_UPDATE,       this._onNodeUpdate);
        this.props.app.on(NodeConstants.NODE_LIST_FETCHED, this._onNodeListFetched);
    },

    componentDidMount: function () {
        this.props.app.emit(NodeConstants.NODE_LIST_FETCH);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener(NodeConstants.NODE_UPDATE,       this._onNodeUpdate);
        this.props.app.removeListener(NodeConstants.NODE_LIST_FETCHED, this._onNodeListFetched);
    },

    render: function () {
        var children = [];

        this.state.nodes.forEach(function (node) {
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

    componentWillMount: function () {
        this.props.app.on(NodeConstants.NODE_FETCHED, this._onNodeFetched);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener(NodeConstants.NODE_FETCHED, this._onNodeFetched);
    },

    _onClick: function (e) {
        e.preventDefault();
        this.props.app.emit(NodeConstants.NODE_FETCH, this.props.key);
    },

    _onNodeFetched: function (node) {
        this.setState({
            active: (node._id === this.props.key)
        });
    },

    render: function () {
        var classes = classSet({
            'node-menu__item': true,
            '_is_active':      this.state.active
        });
        return (
            <a className={classes} onClick={ this._onClick }>{ this.props.name }</a>
        );
    }
});
exports.NodeMenuItem = NodeMenuItem;