'use strict';

var NodeRegistry      = require('../../core/registry/NodeRegistry');
var LayoutRowNode     = require('./components/LayoutRowNode.jsx');
var LayoutRowEditNode = require('./components/LayoutRowEditNode.jsx');


NodeRegistry.register({
    name: 'Row',
    type: 'layout.row',
    accept:   [
        'layout.cell'
    ],
    component: {
        view: LayoutRowNode,
        edit: LayoutRowEditNode
    },
    defaults: {
        columns: 12
    }
});