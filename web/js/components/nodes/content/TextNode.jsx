/** @jsx React.DOM */

'use strict';

var React             = require('react');
var EditableNodeMixin = require('../../mixins/EditableNodeMixin');
var LiveNodeMixin     = require('../../mixins/LiveNodeMixin');

/**
 * Content text node.
 */
var ContentTextNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div>{ this.props.node.settings.content }</div>
        );
    }
});
exports.ContentTextNode = ContentTextNode;



/**
 * Content text node for structure/edition.
 */
var ContentTextEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            content: this.refs.content.getDOMNode().value
        };

        this.props.node.name     = this.refs.name.getDOMNode().value;
        this.props.node.settings = settings;
        this.props.app.save(this.props.node);

        return false;
    },

    render: function () {
        var classes = 'node';
        if (this.state.edit) {
            classes += ' node--editing';
        }

        return (
            <div className={ classes }>
                <span className="node__title">{ this.state.node.name }</span>
                <div className="node__controls">
                    <span className="button button--s" onClick={ this.onEditClick }>
                        <i className="fa fa-pencil"></i>
                        <i className="fa fa-eye"></i>
                    </span>
                </div>
                <div className="node--edit">
                    <form onSubmit={ this._onSubmit }>
                        <p>
                            <label>Name</label>
                            <input type="text" defaultValue={ this.props.node.name } ref="name" />
                        </p>
                        <p>
                            <label>Content</label>
                            <textarea defaultValue={ this.props.node.settings.content } ref="content" />
                        </p>
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
exports.ContentTextEditNode = ContentTextEditNode;