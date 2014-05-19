'use strict';

var NodeRegistry       = require('../../core/registry/NodeRegistry');
var LayoutCellNode     = require('./components/LayoutCellNode.jsx');
var LayoutCellEditNode = require('./components/LayoutCellEditNode.jsx');


NodeRegistry.register({
    name: 'Cell',
    type: 'layout.cell',
    accept:   [
        'content.code',
        'content.text',
        'content.markdown',
        'content.container',
        'nav.menu',
        'nav.breadcrumbs',
        'chart.pie',
        'chart.line'
    ],
    component: {
        view: LayoutCellNode,
        edit: LayoutCellEditNode
    },
    defaults: {
        columns:     12,
        offsetLeft:  0,
        offsetRight: 0
    }
});