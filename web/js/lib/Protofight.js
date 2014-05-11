function Protofight() {
    this.currentNode = null;
    this.baseApiUrl  = 'http://localhost:4000/';
}


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
        this.currentNode = node;
    }.bind(this));

    return p;
};

Protofight.prototype.createNode = function (type) {
    console.log('CREATE', type);
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

            var componentFn = window[type.component[mode]];
            if (typeof componentFn === 'function') {
                return componentFn({
                    key:  node._id,
                    node: node,
                    app:  this
                });
            } else {
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
            edit: 'NavBreadcrumbsNode'
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
            edit: 'ChartPieNode'
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
