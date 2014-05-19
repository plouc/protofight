'use strict';

var NodeRegistry            = require('../../core/registry/NodeRegistry');
var DataJsonApiCallNode     = require('./components/DataJsonApiCallNode.jsx');
var DataJsonApiCallEditNode = require('./components/DataJsonApiCallEditNode.jsx');

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
    },
    augment: function (node) {
        node.hasValidSettings = function () {
            if (this.settings.httpMethod && this.settings.httpMethod !== ''
                && this.settings.url && this.settings.url !== '') {
                return true;
            }

            return false;
        };

        node.getData = function () {
            if (!this.hasValidSettings()) {
                throw new Error('Invalid settings detected, unable to fetch data.');
            }

            return $.ajax({
                url:    this.settings.url,
                method: this.settings.httpMethod
            });
        };
    }
});