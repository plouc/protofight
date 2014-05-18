'use strict';

var NodeRegistry            = require('../../core/registry/NodeRegistry');
var DataJsonApiCallNode     = require('./DataJsonApiCallNode.jsx');
var DataJsonApiCallEditNode = require('./DataJsonApiCallEditNode.jsx');

NodeRegistry.register({
    name: 'Json API call',
    type: 'data.json_api_call',
    accept: null,
    component: {
        view: DataJsonApiCallNode,
        edit: DataJsonApiCallEditNode
    },
    defaults: {
        url:         '',
        httpMethod:  'GET',
        queryParams: {},
        headers:     {}
    }
});