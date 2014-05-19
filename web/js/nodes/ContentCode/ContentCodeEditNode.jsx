/** @jsx React.DOM */

'use strict';

var React              = require('react');
var EditableNodeMixin  = require('../../core/mixins/EditableNodeMixin');
var RemovableNodeMixin = require('../../core/mixins/RemovableNodeMixin');
var LiveNodeMixin      = require('../../core/mixins/LiveNodeMixin');
var NodeMeta           = require('../../core/components/NodeMeta.jsx');


var ContentCodeEditNode = React.createClass({
    mixins: [
        EditableNodeMixin,
        RemovableNodeMixin,
        LiveNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            lang:    this.refs.lang.getDOMNode().value,
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
                            <label>Language</label>
                            <input type="text" defaultValue={ this.state.node.lang } ref="lang" />
                        </p>
                        <p>
                            <label>Content</label>
                            <textarea defaultValue={ this.state.node.settings.content } ref="content" />
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

module.exports = ContentCodeEditNode;