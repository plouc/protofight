'use strict';

var NodeRegistry = require('../../core/registry/NodeRegistry');


NodeRegistry.register({
    name: 'Code',
    type: 'content.code',
    accept: null,
    defaults: {
        lang:    '',
        content: ''
    }
});