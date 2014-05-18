'use strict';

var NodeRegistry           = require('../../core/registry/NodeRegistry');
var NavBreadcrumbsNode     = require('./NavBreadcrumbsNode.jsx');
var NavBreadcrumbsEditNode = require('./NavBreadcrumbsEditNode.jsx');


NodeRegistry.register({
    name: 'Breadcrumbs',
    type: 'nav.breadcrumbs',
    accept:   [
        'nav.breadcrumbs_item'
    ],
    component: {
        view: NavBreadcrumbsNode,
        edit: NavBreadcrumbsEditNode
    }
});