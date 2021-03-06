/** @jsx React.DOM */

'use strict';

var React         = require('react');
var NodeRegistry  = require('../registry/NodeRegistry');
var NodeConstants = require('../constants/NodeConstants');

var NodeTypeSelectorItem = React.createClass({
    _onTypeClick: function (e) {
        e.preventDefault();

        this.props.app.emit(NodeConstants.NODE_APPEND_CHILD, this.props.type, this.props.node);
        this.props.app.create(this.props.type, this.props.node);
    },

    render: function () {
        return (
            <a className="node-type-selector__list__item" onClick={ this._onTypeClick }>{ this.props.type.name }</a>
        );
    }
});

var NodeTypeSelector = React.createClass({
    getInitialState: function () {
        return {
            opened: false
        };
    },

    _onToggleClick: function () {
        this.setState({
            opened: !this.state.opened
        });
    },

    render: function () {
        var children = [];
        NodeRegistry.getAllowedTypes(this.props.node.type).forEach(function (type) {
            children.push(<NodeTypeSelectorItem  key={ type.type } node={ this.props.node } type={ type } app={ this.props.app } />);
        }.bind(this));

        var classes = 'node-type-selector';
        if (this.state.opened) {
            classes += ' node-type-selector--opened';
        }

        return (
            <div className={ classes }>
                <span className="button button--s" onClick={ this._onToggleClick }>
                    <i className="fa fa-plus" />
                </span>
                <div className="node-type-selector__list">
                    { children }
                </div>
            </div>
        );
    }
});

module.exports = NodeTypeSelector;