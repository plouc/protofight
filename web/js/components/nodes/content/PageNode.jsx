/** @jsx React.DOM */

'use strict';

var React              = require('react');
var NodeTypeSelector   = require('../../NodeTypeSelector.jsx');
var EditableNodeMixin  = require('../../mixins/EditableNodeMixin');
var ContainerNodeMixin = require('../../mixins/ContainerNodeMixin');
var LiveNodeMixin      = require('../../mixins/LiveNodeMixin');
var NodeMeta           = require('../../NodeMeta.jsx');

var ContentPageNode = React.createClass({
    mixins: [
        ContainerNodeMixin,
        LiveNodeMixin
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
exports.ContentPageNode = ContentPageNode;



var ContentPageEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        ContainerNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
        };

        this.state.node.name = this.refs.name.getDOMNode().value;
        this.state.node.settings = settings;
        this.props.app.save(this.state.node);

        return false;
    },

    render: function () {
        var children = this.getChildrenNodes('edit');

        var classes  = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.state.node.name }</span>
                <div className="node__controls">
                    <NodeTypeSelector node={ this.state.node } app={ this.props.app }/>
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                    <span className="button button--danger button--s" onClick={ this._onDeleteClick }>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <NodeMeta node={ this.state.node }/>
                    <form onSubmit={ this._onSubmit }>
                        <p>
                            <label>Name</label>
                            <input type="text" defaultValue={ this.state.node.name } ref="name" />
                        </p>
                        <p>
                            <button className="button" type="submit">save</button>
                            <span className="button button--warning" onClick={ this._onCancelEditClick }>cancel</span>
                        </p>
                    </form>
                </div>
                <div>{ children }</div>
            </div>
        );
    }
});
exports.ContentPageEditNode = ContentPageEditNode;