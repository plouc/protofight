/** @jsx React.DOM */

var Node = React.createClass({
    render: function () {
        return (
            <div>{ this.props.name }</div>
        );
    }
});

var Nodes = React.createClass({
    render: function () {
        var children = [];
        this.props.nodes.forEach(function (node) {
            children.push(<Node key={ node._id } name={ node.name }/>)
        });
        return (
            <div>{ children }</div>
        );
    }
});


function Protofight() {
    this.currentNode = null;
}

Protofight.prototype.mountNode = function (nodeId) {
    $.ajax({
        url: 'http://localhost:4000/nodes/' + nodeId + '/children'
    })
    .done(function (node) {
        this.augmentNode(node);
        this.currentNode = node;
        React.renderComponent(this.getNodeComponent(node, 'view'), $('.content-struct').get(0));
    }.bind(this));
};

Protofight.prototype.getNodeComponent = function (node, mode) {
    for (var i = 0; i < types.length; i++) {
        var type = types[i];
        if (type.type === node.type) {
            if (!type.component || !type.component[mode]) {
                throw new Error('Node type "' + type.type + '" has an invalid configuration for mode "' + mode + '"');
            }

            var componentFn = window[type.component[mode]];
            if (typeof componentFn === 'function') {
                return componentFn({
                    key:  node._id,
                    node: node
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

var protofight;
$(document).ready(function () {
    protofight = new Protofight();

    $.ajax({
        url: 'http://localhost:4000/nodes'
    })
    .done(function (nodes) {
        protofight.augmentNodes(nodes);
        React.renderComponent(<NodeMenu nodes={ nodes }/>, $('._js_node_instances').get(0));
        React.renderComponent(<NodeTypes types={ types }/>, $('._js_components').get(0));
    });
});


/**
 * Define all available nodes.
 */
var types = [
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
            edit: 'ContentContainerNode'
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
            edit: 'NavMenuNode'
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
            edit: 'NavMenuItemNode'
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
            edit: 'LayoutRowNode'
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
            edit: 'LayoutCellNode'
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
            edit: 'ChartSimpleLineNode'
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
            edit: 'ChartSimpleLineNode'
        },
        accept:    ['data.static_json']
    }
];