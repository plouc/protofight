/** @jsx React.DOM */

'use strict';

var $                 = require('jquery');
var React             = require('react');
var LiveNodeMixin     = require('../../mixins/LiveNodeMixin');
var EditableNodeMixin = require('../../mixins/EditableNodeMixin');
var NodeMeta          = require('../../NodeMeta.jsx');

var DataJsonApiCallNode = React.createClass({
    mixins: [
        LiveNodeMixin
    ],

    componentWillMount: function () {
    },

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <pre>{ this.state.node.settings.httpMethod } { this.state.node.settings.url }</pre>
        );
    }
});
exports.DataJsonApiCallNode = DataJsonApiCallNode;



var DataJsonApiCallEditNode = React.createClass({
    mixins: [
        LiveNodeMixin,
        EditableNodeMixin
    ],

    propTypes: {
        node: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            rawApiResponse: 'no response to display'
        };
    },

    _onSubmit: function (e) {
        e.preventDefault();

        var settings = {
            httpMethod: this.refs.httpMethod.getDOMNode().value,
            url:        this.refs.url.getDOMNode().value
        };

        this.props.node.name = this.refs.name.getDOMNode().value;
        this.props.node.settings = settings;
        this.props.app.save(this.props.node);

        return false;
    },

    _onTestClick: function (e) {
        if (this.state.node.hasValidSettings()) {
            this.setState({
                rawApiResponse: 'loading…'
            });
            this.state.node.getData()
                .then(
                    function (data) {
                        this.setState({
                            rawApiResponse: JSON.stringify(data, null, 4)
                        });
                    }.bind(this),
                    function (err) {
                        var errorMessage = 'An error occured while fetching data: ';
                        if (err.status && err.statusText) {
                            errorMessage += '[' + err.status + '] ' + err.statusText;
                        }
                        this.setState({
                            rawApiResponse: errorMessage
                        });
                    }.bind(this)
                );
        }
    },

    _onTestClearClick: function (e) {
        this.setState({
            rawApiResponse: 'no response to display'
        });
    },

    render: function () {
        var classes  = 'node';
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
                            <label>Http method</label>
                            <input type="text" defaultValue={ this.state.node.settings.httpMethod } ref="httpMethod" />

                            <label>Url</label>
                            <input type="text" defaultValue={ this.state.node.settings.url } ref="url" />
                        </p>
                        <p>
                            <span className="button" onClick={ this._onTestClick }>test call</span>
                            <span className="button button--warning" onClick={ this._onTestClearClick }>clear response</span>
                        </p>
                        <div className="json-api-call__raw-response">
                            <pre>{ this.state.rawApiResponse }</pre>
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
exports.DataJsonApiCallEditNode = DataJsonApiCallEditNode;