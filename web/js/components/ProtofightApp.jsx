/** @jsx React.DOM */

'use strict';

var React                  = require('react');
var LeftPanel              = require('./LeftPanel.jsx');
var RightPanel             = require('./RightPanel.jsx');
var NodeConstants          = require('../constants/NodeConstants');
var NodeComponentQualifier = require('../lib/NodeComponentQualifier');


var ProtofightApp = React.createClass({
    getInitialState: function () {
        return {
            nodes: []
        };
    },

    componentDidMount: function() {
        this.props.app.listNodes()
            .then(function (nodes) {
                this.setState({
                    nodes: nodes
                });
            }.bind(this));
    },

    handleNodeClick: function (component, e) {
        this.props.app.mountNode(component.props.key)
            .done(function (node) {
                this.setState({
                    currentNode: node
                });
            }.bind(this));
    },

    render: function () {
        //ng-class="{ 'site-content--left-closed': !asideLeft, 'site-content--right-closed': !asideRight }"

        return (
            <div>
                <LeftPanel nodes={ this.state.nodes } nodeClickedHandler={ this.handleNodeClick } />
                <NodeView app={ this.props.app } node={ this.state.currentNode } />
                <RightPanel app={ this.props.app } />
            </div>
        );
    }
});
module.exports = ProtofightApp;



var NodeView = React.createClass({
    getInitialState: function () {
        this.props.app.on('create', function (node) {
            this.setState({
                viewMode: this.state.viewMode,
                node:     node
            });
        }.bind(this));

        this.props.app.on('select', function (node) {
            this.setState({
                viewMode: this.state.viewMode,
                node:     node
            });
        }.bind(this));

        return {
            node:     false,
            viewMode: 'struct'
        };
    },

    handleClick: function (mode, e) {
        this.setState({
            node:     this.state.node,
            viewMode: mode
        });
    },

    render: function () {
        var classes = 'site-content node-view--' + this.state.viewMode;

        var nodeStruct  = '';
        var nodePreview = '';
        var nodeRaw     = '';

        if (this.state.node && this.state.viewMode == 'struct') {
            nodeStruct = NodeComponentQualifier.getNodeComponent(this.state.node, 'edit', this.props.app);
        }

        if (this.state.node && this.state.viewMode == 'preview') {
            nodePreview = NodeComponentQualifier.getNodeComponent(this.state.node, 'view', this.props.app);
        }

        if (this.state.node && this.state.viewMode == 'raw') {
            nodeRaw = JSON.stringify(this.state.node, '', 4);
        }

        return (
            <div className={ classes }>
                <div className="content-struct">{ nodeStruct }</div>
                <div className="content-preview">{ nodePreview }</div>
                <div className="content-raw">
                    <pre>{ nodeRaw }</pre>
                </div>
                <div className="switch-view">
                    <span onClick={ this.handleClick.bind(this, 'struct') }>
                        <i className="fa fa-sitemap"></i>
                        structure
                    </span>
                    <span onClick={ this.handleClick.bind(this, 'preview') }>
                        <i className="fa fa-eye"></i>
                        preview
                    </span>
                    <span onClick={ this.handleClick.bind(this, 'raw') }>
                        <i className="fa fa-code"></i>
                        raw
                    </span>
                </div>
            </div>
        );
    }
});