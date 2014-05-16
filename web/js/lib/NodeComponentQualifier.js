'use strict';

var nodeTypes = require('./nodeTypes');

var components = {
    // DATA VIZ
    ChartPieNode:            require('../components/nodes/chart/PieNode.jsx').ChartPieNode,
    ChartPieEditNode:        require('../components/nodes/chart/PieNode.jsx').ChartPieEditNode,
    ChartSimpleLineNode:     require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineNode,
    ChartSimpleLineEditNode: require('../components/nodes/chart/SimpleLineNode.jsx').ChartSimpleLineEditNode,

    // CONTENT
    ContentPageNode:          require('../components/nodes/content/PageNode.jsx').ContentPageNode,
    ContentPageEditNode:      require('../components/nodes/content/PageNode.jsx').ContentPageEditNode,
    ContentContainerNode:     require('../components/nodes/content/ContainerNode.jsx').ContentContainerNode,
    ContentContainerEditNode: require('../components/nodes/content/ContainerNode.jsx').ContentContainerEditNode,
    ContentTextNode:          require('../components/nodes/content/TextNode.jsx').ContentTextNode,
    ContentTextEditNode:      require('../components/nodes/content/TextNode.jsx').ContentTextEditNode,
    ContentMarkdownNode:      require('../components/nodes/content/MarkdownNode.jsx').ContentMarkdownNode,
    ContentMarkdownEditNode:  require('../components/nodes/content/MarkdownNode.jsx').ContentMarkdownEditNode,

    // DATA
    DataStaticJsonNode:      require('../components/nodes/data/StaticJsonNode.jsx').DataStaticJsonNode,
    DataStaticJsonEditNode:  require('../components/nodes/data/StaticJsonNode.jsx').DataStaticJsonEditNode,
    DataJsonApiCallNode:     require('../components/nodes/data/JsonApiCallNode.jsx').DataJsonApiCallNode,
    DataJsonApiCallEditNode: require('../components/nodes/data/JsonApiCallNode.jsx').DataJsonApiCallEditNode,

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


/**
 * Returns matching react component for given node in given mode (view/edit).
 *
 * @param {object} node
 * @param {string} mode
 * @returns {*}
 */
exports.getNodeComponent = function (node, mode, app) {
    var type = nodeTypes.getType(node.type);

    if (!type.component || !type.component[mode] || !components[type.component[mode]]) {
        throw new Error('Unable to instantiate component for type "' + type.type + '" with mode "' + mode + '"');
    }

    return components[type.component[mode]]({
        key:  node._id,
        node: node,
        app:  app
    });
};

/**
 * Build child node components from given parent node.
 *
 * @param {object} node
 * @param {string} mode
 * @returns {Array}
 */
exports.getChildNodesComponents = function (node, mode, app) {
    var children = [];
    node.nodes.forEach(function (childNode) {
        children.push(exports.getNodeComponent(childNode, mode, app));
    });

    return children;
};