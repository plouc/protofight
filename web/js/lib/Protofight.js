'use strict';

var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;

var React = require('react');

// DATA VIZ
var ChartPieNode            = require('../components/nodes/chart/PieNode.jsx').ChartPieNode;
var ChartPieEditNode        = require('../components/nodes/chart/PieNode.jsx').ChartPieEditNode;
var ChartSimpleLineNode     = require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineNode;
var ChartSimpleLineEditNode = require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineEditNode;

// CONTENT
var ContentContainerNode     = require('../components/nodes/content/ContainerNode.jsx').ContentContainerNode;
var ContentContainerEditNode = require('../components/nodes/content/ContainerNode.jsx').ContentContainerEditNode;
var ContentTextNode          = require('../components/nodes/content/TextNode.jsx').ContentTextNode;

// DATA
var DataStaticJsonNode = require('../components/nodes/data/StaticJsonNode.jsx').DataStaticJsonNode;

// LAYOUT
var LayoutCellNode     = require('../components/nodes/layout/CellNode.jsx').LayoutCellNode;
var LayoutCellEditNode = require('../components/nodes/layout/CellNode.jsx').LayoutCellEditNode;
var LayoutRowNode      = require('../components/nodes/layout/RowNode.jsx').LayoutRowNode;
var LayoutRowEditNode  = require('../components/nodes/layout/RowNode.jsx').LayoutRowEditNode;

// NAV
var NavBreadcrumbsNode     = require('../components/nodes/nav/BreadcrumbsNode.jsx').NavBreadcrumbsNode;
var NavBreadcrumbsEditNode = require('../components/nodes/nav/BreadcrumbsNode.jsx').NavBreadcrumbsEditNode;
var NavMenuItemNode        = require('../components/nodes/nav/MenuItemNode.jsx').NavMenuItemNode;
var NavMenuItemEditNode    = require('../components/nodes/nav/MenuItemNode.jsx').NavMenuItemEditNode;
var NavMenuNode            = require('../components/nodes/nav/MenuNode.jsx').NavMenuNode;
var NavMenuEditNode        = require('../components/nodes/nav/MenuNode.jsx').NavMenuEditNode;

function Protofight (config) {
    EventEmitter.call(this);
    this.currentNode = null;
    this.baseApiUrl  = 'http://localhost:4000/';
}

Protofight.prototype = new EventEmitter;

Protofight.prototype.listNodes = function () {
    var p = $.ajax({
        url: this.baseApiUrl + 'nodes'
    });

    p.done(function (nodes) {
        this.augmentNodes(nodes);
    }.bind(this));

    return p;
};

Protofight.prototype.mountNode = function (nodeId) {
    var p = $.ajax({
        url: this.baseApiUrl + 'nodes/' + nodeId + '/children'
    });

    p.done(function (node) {
        this.augmentNode(node);
        this.emit('select', node);
    }.bind(this));

    return p;
};

Protofight.prototype.createNode = function (type, parent) {
    var parentId = null;
    if (parent) {
        parentId = parent._id;
    }

    var newNode = {
        name:       type.name,
        type:       type.type,
        nodes:      [],
        parent:     parentId,
        settings:   type.defaults || {}
    };

    var p = $.ajax({
        url:    this.baseApiUrl + 'nodes',
        method: 'POST',
        data:   newNode
    });

    this.augmentNode(newNode);

    this.emit('create', newNode);

    return p;
};

Protofight.prototype.save = function (node) {
    var p = $.ajax({
        url:    this.baseApiUrl + 'nodes',
        method: 'PUT',
        data:   node
    });
};

Protofight.prototype.getNodeComponent = function (node, mode) {
    for (var i = 0; i < Protofight.nodeTypes.length; i++) {
        var type = Protofight.nodeTypes[i];
        if (type.type === node.type) {
            if (!type.component || !type.component[mode]) {
                throw new Error('Node type "' + type.type + '" has an invalid configuration for mode "' + mode + '"');
            }

            try {
                // @todo find a cleaner way to handle dynamic component creation…
                return (eval(type.component[mode]))({
                    key:  node._id,
                    node: node,
                    app:  this
                });
            } catch (e) {
                throw new Error('"' + type.component + '" is not a valid component');
            }
        }
    }

    throw new Error('Unable to get component for node: ' + node.type);
};

Protofight.prototype.buildChildNodeList = function (node, mode) {
    var children = [];
    node.nodes.forEach(function (childNode) {
        children.push(this.getNodeComponent(childNode, mode));
    }.bind(this));

    return children;
};

Protofight.prototype.augmentNodes = function (nodes) {
    nodes.forEach(function (node) {
        this.augmentNode(node);
    }.bind(this));
};


Protofight.prototype.augmentNode = function (node) {
    if (node.type === 'breadcrumbs') {
        node.getItems = function () {
            return $.ajax({
                url: 'http://localhost:4000/nodes/pick',
                data: {
                    ids: node.ancestors
                }
            });
        };
    }

    if (node.nodes && node.nodes.length > 0) {
        this.augmentNodes(node.nodes);
    }
};



/**
 * Define all available nodes.
 */
Protofight.nodeTypes = [
    //---------------------------------------------------------
    //
    // CONTENT related types
    //
    //---------------------------------------------------------
    {
        name:      'Node container',
        type:      'container',
        component: {
            view: 'ContentContainerNode',
            edit: 'ContentContainerEditNode'
        },
        accept:   [
            'code',
            'text',
            'menu',
            'container',
            'chart',
            'breadcrumbs',
            'layout.row'
        ]
    },
    {
        name:      'Text node',
        type:      'text',
        component: {
            view: 'ContentTextNode',
            edit: 'ContentTextNode'
        },
        accept:    null,
        defaults: {
            content: ''
        }
    },
    {
        name:      'Code node',
        type:      'code',
        component: {
            view: 'ContentTextNode',
            edit: 'ContentTextNode'
        },
        accept:    null,
        defaults: {
            lang:    '',
            content: ''
        }
    },

    //---------------------------------------------------------
    //
    // NAV related types
    //
    //---------------------------------------------------------
    {
        name:      'Breadcrumbs',
        type:      'breadcrumbs',
        component: {
            view: 'NavBreadcrumbsNode',
            edit: 'NavBreadcrumbsEditNode'
        },
        accept:    null
    },
    {
        name:      'Menu',
        type:      'menu',
        component: {
            view: 'NavMenuNode',
            edit: 'NavMenuEditNode'
        },
        accept:    [
            'menu.item'
        ]
    },
    {
        name:      'Menu item',
        type:      'menu.item',
        component: {
            view: 'NavMenuItemNode',
            edit: 'NavMenuItemEditNode'
        },
        accept:    null,
        defaults:  {
            label:  'Item label',
            target: null
        }
    },

    //---------------------------------------------------------
    //
    // DATA related types
    //
    //---------------------------------------------------------
    {
        name:      'Static json',
        type:      'data.static_json',
        component: {
            view: 'DataStaticJsonNode',
            edit: 'DataStaticJsonNode'
        },
        accept:    null,
        defaults: {
            content: '{}'
        }
    },

    //---------------------------------------------------------
    //
    // LAYOUT related types
    //
    //---------------------------------------------------------
    {
        name:      'Row',
        type:      'layout.row',
        component: {
            view: 'LayoutRowNode',
            edit: 'LayoutRowEditNode'
        },
        defaults: {
            columns: 12
        },
        accept:   [
            'layout.cell'
        ]
    },
    {
        name:      'Cell',
        type:      'layout.cell',
        component: {
            view: 'LayoutCellNode',
            edit: 'LayoutCellEditNode'
        },
        defaults: {
            columns:     12,
            offsetLeft:  0,
            offsetRight: 0
        },
        accept:   [
            'code',
            'text',
            'menu',
            'container',
            'chart',
            'breadcrumbs'
        ]
    },

    //---------------------------------------------------------
    //
    // DATA VIZ related types
    //
    //---------------------------------------------------------
    {
        name:      'Chart',
        type:      'chart',
        component: {
            view: 'ChartSimpleLineNode',
            edit: 'ChartSimpleLineEditNode'
        },
        accept:    [
            'data.static_json'
        ]
    },

    {
        name:      'Pie chart',
        type:      'chart.pie',
        component: {
            view: 'ChartPieNode',
            edit: 'ChartPieEditNode'
        },
        accept:    [
            'data.static_json'
        ],
        defaults:  {
            showLabels:         true,
            showLegend:         false,
            donut:              true,
            transition:         true,
            transitionDuration: 400
        }
    },
    {
        name:      'Simple line chart',
        type:      'chart.simple_line',
        component: {
            view: 'ChartSimpleLineNode',
            edit: 'ChartSimpleLineEditNode'
        },
        accept:    ['data.static_json']
    }
];

exports.Protofight = Protofight;

var _protofight;
exports.protofight = function (config) {
    if (!_protofight) {
        _protofight = new Protofight(config);
    }

    return _protofight;
};