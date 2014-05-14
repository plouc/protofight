'use strict';

var $            = require('jquery');
var EventEmitter = require('events').EventEmitter;
var nodeTypes    = require('./nodeTypes');
var React        = require('react');

var components = {
    // DATA VIZ
    ChartPieNode:            require('../components/nodes/chart/PieNode.jsx').ChartPieNode,
    ChartPieEditNode:        require('../components/nodes/chart/PieNode.jsx').ChartPieEditNode,
    ChartSimpleLineNode:     require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineNode,
    ChartSimpleLineEditNode: require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineEditNode,

    // CONTENT
    ContentContainerNode:     require('../components/nodes/content/ContainerNode.jsx').ContentContainerNode,
    ContentContainerEditNode: require('../components/nodes/content/ContainerNode.jsx').ContentContainerEditNode,
    ContentTextNode:          require('../components/nodes/content/TextNode.jsx').ContentTextNode,

    // DATA
    DataStaticJsonNode: require('../components/nodes/data/StaticJsonNode.jsx').DataStaticJsonNode,

    // LAYOUT
    LayoutCellNode:     require('../components/nodes/layout/CellNode.jsx').LayoutCellNode,
    LayoutCellEditNode: require('../components/nodes/layout/CellNode.jsx').LayoutCellEditNode,
    LayoutRowNode:      require('../components/nodes/layout/RowNode.jsx').LayoutRowNode,
    LayoutRowEditNode:  require('../components/nodes/layout/RowNode.jsx').LayoutRowEditNode,

    // NAV
    NavBreadcrumbsNode:         require('../components/nodes/nav/Breadcrumbs.jsx').NavBreadcrumbsNode,
    NavBreadcrumbsEditNode:     require('../components/nodes/nav/Breadcrumbs.jsx').NavBreadcrumbsEditNode,
    NavBreadcrumbsItemNode:     require('../components/nodes/nav/Breadcrumbs.jsx').NavBreadcrumbsItemNode,
    NavBreadcrumbsItemEditNode: require('../components/nodes/nav/Breadcrumbs.jsx').NavBreadcrumbsItemEditNode,
    NavMenuItemNode:            require('../components/nodes/nav/MenuItemNode.jsx').NavMenuItemNode,
    NavMenuItemEditNode:        require('../components/nodes/nav/MenuItemNode.jsx').NavMenuItemEditNode,
    NavMenuNode:                require('../components/nodes/nav/MenuNode.jsx').NavMenuNode,
    NavMenuEditNode:            require('../components/nodes/nav/MenuNode.jsx').NavMenuEditNode
};

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
        url:         this.baseApiUrl + 'nodes',
        method:      'POST',
        contentType: 'application/json',
        data:        JSON.stringify(newNode)
    });

    this.augmentNode(newNode);

    this.emit('create', newNode);

    return p;
};

Protofight.prototype.save = function (node) {
    var p = $.ajax({
        url:         this.baseApiUrl + 'nodes/' + node._id,
        method:      'PUT',
        contentType: 'application/json',
        data:        JSON.stringify(node)
    });
};

/**
 * Returns matching react component for given node in given mode (view/edit).
 *
 * @param {object} node
 * @param {string} mode
 * @returns {*}
 */
Protofight.prototype.getNodeComponent = function (node, mode) {
    var type = nodeTypes.getType(node.type);

    if (!type.component || !type.component[mode] || !components[type.component[mode]]) {
        throw new Error('Unable to instantiate component for type "' + type.type + '" with mode "' + mode + '"');
    }

    return components[type.component[mode]]({
        key:  node._id,
        node: node,
        app:  this
    });
};

/**
 * Build child node components from given parent node.
 *
 * @param {object} node
 * @param {string} mode
 * @returns {Array}
 */
Protofight.prototype.buildChildNodeList = function (node, mode) {
    var children = [];
    node.nodes.forEach(function (childNode) {
        children.push(this.getNodeComponent(childNode, mode));
    }.bind(this));

    return children;
};

/**
 * 'Augment' nodes with custom method according to its type.
 *
 * @param {array} nodes
 */
Protofight.prototype.augmentNodes = function (nodes) {
    nodes.forEach(function (node) {
        this.augmentNode(node);
    }.bind(this));
};

/**
 * 'Augment' node with custom method according to its type.
 *
 * @param {object} node
 */
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

exports.Protofight = Protofight;

var _protofight;
exports.protofight = function (config) {
    if (!_protofight) {
        _protofight = new Protofight(config);
    }

    return _protofight;
};