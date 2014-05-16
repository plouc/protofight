/** @jsx React.DOM */

'use strict';

var React             = require('react');
var EditableNodeMixin = require('../../mixins/EditableNodeMixin');
var LiveNodeMixin     = require('../../mixins/LiveNodeMixin');
var NodeMeta          = require('../../NodeMeta.jsx');
var marked            = require('marked');

/**
 * Content markdown node.
 */
var ContentMarkdownNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div dangerouslySetInnerHTML={{ __html: marked(this.state.node.settings.content) }}>
            </div>
        );
    }
});
exports.ContentMarkdownNode = ContentMarkdownNode;



/**
 * Content markdown node for structure/edition.
 */
var ContentMarkdownEditNode = React.createClass({
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

    _onContentChange: function() {
        this.state.node.settings.content = this.refs.content.getDOMNode().value;
        this.forceUpdate();
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
                            <label>Content</label>
                            <textarea defaultValue={ this.state.node.settings.content } ref="content"
                                      onChange={ this._onContentChange }
                                      cols="80" rows="10"
                                      className="form-control form-control--full"/>
                        </p>
                        <div>
                            <span>Preview</span>
                            <div dangerouslySetInnerHTML={{ __html: marked(this.state.node.settings.content) }}>
                            </div>
                        </div>
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
exports.ContentMarkdownEditNode = ContentMarkdownEditNode;