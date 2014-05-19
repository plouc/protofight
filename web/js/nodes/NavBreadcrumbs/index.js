'use strict';

var NodeRegistry               = require('../../core/registry/NodeRegistry');
var NavBreadcrumbsNode         = require('./components/NavBreadcrumbsNode.jsx');
var NavBreadcrumbsEditNode     = require('./components/NavBreadcrumbsEditNode.jsx');
var NavBreadcrumbsItemNode     = require('./components/NavBreadcrumbsItemNode.jsx');
var NavBreadcrumbsItemEditNode = require('./components/NavBreadcrumbsItemEditNode.jsx');


NodeRegistry.register({
    name: 'Breadcrumbs',
    type: 'nav.breadcrumbs',
    accept:   [
        'nav.breadcrumbs_item'
    ],
    component: {
        view: NavBreadcrumbsNode,
        edit: NavBreadcrumbsEditNode
    },
    augment: function (node) {
        node.getItems = function () {
            return $.ajax({
                url: '/nodes/pick',
                data: {
                    ids: node.ancestors
                }
            });
        };
    }
});

NodeRegistry.register({
    name:   'Breadcrumbs item',
    type:   'nav.breadcrumbs_item',
    accept: null,
    component: {
        view: NavBreadcrumbsItemNode,
        edit: NavBreadcrumbsItemEditNode
    }
});