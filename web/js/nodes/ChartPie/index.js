'use strict';

var NodeRegistry     = require('../../core/registry/NodeRegistry');
var ChartPieNode     = require('./ChartPieNode.jsx');
var ChartPieEditNode = require('./ChartPieEditNode.jsx');

NodeRegistry.register({
    name: 'Pie chart',
    type: 'chart.pie',
    component: {
        view: ChartPieNode,
        edit: ChartPieEditNode
    },
    accept:    [
        'data.static_json',
        'data.json_api_call'
    ],
    defaults:  {
        showLabels:         true,
        showLegend:         false,
        donut:              true,
        transition:         true,
        transitionDuration: 400
    }
});