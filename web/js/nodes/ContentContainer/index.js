'use strict';

var NodeRegistry             = require('../../core/registry/NodeRegistry');
var ContentContainerNode     = require('./components/ContentContainerNode.jsx');
var ContentContainerEditNode = require('./components/ContentContainerEditNode.jsx');


NodeRegistry.register({
    name: 'Container',
    type: 'content.container',
    component: {
        view: ContentContainerNode,
        edit: ContentContainerEditNode
    },
    accept:   [
        'content.code',
        'content.text',
        'content.markdown',
        'content.container',
        'chart.pie',
        'chart.line',
        'nav.breadcrumbs',
        'nav.menu',
        'layout.row'
    ]
});