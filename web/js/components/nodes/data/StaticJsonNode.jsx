/** @jsx React.DOM */

'use strict';

var React             = require('react');
var LiveNodeMixin     = require('../../mixins/LiveNodeMixin');
var EditableNodeMixin = require('../../mixins/EditableNodeMixin');
var NodeConstants     = require('../../../constants/NodeConstants');

var DataStaticJsonNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.state.node.settings.content }</pre>
        );
    }
});
exports.DataStaticJsonNode = DataStaticJsonNode;



var DataStaticJsonEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onDeleteClick: function (e) {
        this.props.app.emit(NodeConstants.NODE_DESTROY, this.props.node);
    },

    render: function () {
        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.props.node.name }</span>
                <div className="node__controls">
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this.handleSubmit }>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning" onClick={ this._onCancelEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
            </div>
            );
    }
});
exports.DataStaticJsonEditNode = DataStaticJsonEditNode;