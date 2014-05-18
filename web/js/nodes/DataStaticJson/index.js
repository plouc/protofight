'use strict';

var NodeRegistry           = require('../../core/registry/NodeRegistry');
var DataStaticJsonNode     = require('./DataStaticJsonNode.jsx');
var DataStaticJsonEditNode = require('./DataStaticJsonEditNode.jsx');


NodeRegistry.register({
    name:   'Static json',
    type:   'data.static_json',
    accept: null,
    component: {
        view: DataStaticJsonNode,
        edit: DataStaticJsonEditNode
    },
    defaults: {
        content: '{}'
    }
});