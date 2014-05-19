'use strict';

var NodeRegistry        = require('../../core/registry/NodeRegistry');
var ContentPageNode     = require('./components/ContentPageNode.jsx');
var ContentPageEditNode = require('./components/ContentPageEditNode.jsx');


NodeRegistry.register({
    name: 'Page',
    type: 'content.page',
    accept:   [
        'content.code',
        'content.text',
        'content.markdown',
        'content.container',
        'chart.pie',
        'chart.line',
        'layout.row',
        'nav.breadcrumbs',
        'nav.menu'
    ],
    component: {
        view: ContentPageNode,
        edit: ContentPageEditNode
    }
});