'use strict';

var NodeRegistry        = require('../../core/registry/NodeRegistry');
var ContentCodeNode     = require('./components/ContentCodeNode.jsx');
var ContentCodeEditNode = require('./components/ContentCodeEditNode.jsx');


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