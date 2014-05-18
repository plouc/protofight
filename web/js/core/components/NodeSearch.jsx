/** @jsx React.DOM */

'use strict';

var React         = require('react');
var NodeConstants = require('../constants/NodeConstants');

var NodeSearch = React.createClass({
    getInitialState: function () {
        return {
            nodes: []
        };
    },

    componentWillMount: function () {
        this.props.app.on(NodeConstants.NODE_SEARCH_RESULT, this._onSearchResult);
    },

    componentWillUnmount: function () {
        this.props.app.removeListener(NodeConstants.NODE_SEARCH_RESULT, this._onSearchResult);
    },

    _onTermChange: function () {
        var term = this.refs.term.getDOMNode().value;

        this.props.app.emit(NodeConstants.NODE_SEARCH_QUERY, term);
    },

    _onSearchResult: function (nodes) {
        this.setState({
            nodes: nodes
        });
    },

    render: function () {
        var children = [];
        this.state.nodes.forEach(function (node) {
            children.push(<div className="node-search__results__item" key={ node._id }>{ node.name }</div>);
        });

        return (
            <div className="node-search">
                <input type="search" className="form-control node-search__term" defaultValue="" onChange={ this._onTermChange } ref="term" />
                <div className="node-search__results">
                    { children }
                </div>
            </div>
        );
    }
});
module.exports = NodeSearch;