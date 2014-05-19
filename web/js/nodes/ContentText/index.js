'use strict';

var NodeRegistry        = require('../../core/registry/NodeRegistry');
var ContentTextNode     = require('./components/ContentTextNode.jsx');
var ContentTextEditNode = require('./components/ContentTextEditNode.jsx');


NodeRegistry.register({
    name: 'Text',
    type: 'content.text',
    accept: null,
    component: {
        view: ContentTextNode,
        edit: ContentTextEditNode
    },
    defaults: {
        content: ''
    }
});