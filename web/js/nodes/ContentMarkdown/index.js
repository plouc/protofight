'use strict';

var NodeRegistry             = require('../../core/registry/NodeRegistry');
var ContentMarkdownNode     = require('./ContentMarkdownNode.jsx');
var ContentMarkdownEditNode = require('./ContentMarkdownEditNode.jsx');

NodeRegistry.register({
    name: 'Markdown',
    type: 'content.markdown',
    component: {
        view: ContentMarkdownNode,
        edit: ContentMarkdownEditNode
    },
    accept: null
});