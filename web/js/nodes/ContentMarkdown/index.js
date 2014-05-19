'use strict';

var NodeRegistry             = require('../../core/registry/NodeRegistry');
var ContentMarkdownNode     = require('./components/ContentMarkdownNode.jsx');
var ContentMarkdownEditNode = require('./components/ContentMarkdownEditNode.jsx');


NodeRegistry.register({
    name: 'Markdown',
    type: 'content.markdown',
    component: {
        view: ContentMarkdownNode,
        edit: ContentMarkdownEditNode
    },
    accept: null,
    defaults: {
        content: ''
    }
});