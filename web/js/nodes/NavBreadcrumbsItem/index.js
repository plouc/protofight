'use strict';

var NodeRegistry               = require('../../core/registry/NodeRegistry');
var NavBreadcrumbsItemNode     = require('./NavBreadcrumbsItemNode.jsx');
var NavBreadcrumbsItemEditNode = require('./NavBreadcrumbsItemEditNode.jsx');


NodeRegistry.register({
    name:   'Breadcrumbs item',
    type:   'nav.breadcrumbs_item',
    accept: null,
    component: {
        view: NavBreadcrumbsItemNode,
        edit: NavBreadcrumbsItemEditNode
    }
});