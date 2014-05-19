'use strict';

var NodeRegistry        = require('../../core/registry/NodeRegistry');
var ContentCodeNode     = require('./ContentCodeNode.jsx');
var ContentCodeEditNode = require('./ContentCodeEditNode.jsx');


NodeRegistry.register({
    name: 'Code',
    type: 'content.code',
    accept: null,
    defaults: {
        lang:    '',
        content: ''
    },
    component: {
        view: ContentCodeNode,
        edit: ContentCodeEditNode
    }
});