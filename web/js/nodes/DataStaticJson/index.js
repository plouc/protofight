'use strict';

var NodeRegistry           = require('../../core/registry/NodeRegistry');
var DataStaticJsonNode     = require('./components/DataStaticJsonNode.jsx');
var DataStaticJsonEditNode = require('./components/DataStaticJsonEditNode.jsx');


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