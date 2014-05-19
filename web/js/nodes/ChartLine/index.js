'use strict';

var NodeRegistry     = require('../../core/registry/NodeRegistry');
var ChartLineNode     = require('./components/ChartLineNode.jsx');
var ChartLineEditNode = require('./components/ChartLineEditNode.jsx');

NodeRegistry.register({
    type: 'chart.line',
    name: 'Line chart',
    component: {
        view: ChartLineNode,
        edit: ChartLineEditNode
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