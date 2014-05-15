'use strict';

var _ = require('lodash');

/**
 * Define all available nodes.
 */
exports.all = [
    //---------------------------------------------------------
    // CONTENT related types
    //---------------------------------------------------------
    {
        name:      'Page',
        type:      'page',
        component: {
            view: 'ContentPageNode',
            edit: 'ContentPageEditNode'
        },
        accept:   [
            'code',
            'text',
            'markdown',
            'menu',
            'container',
            'chart.pie',
            'chart.simple_line',
            'breadcrumbs',
            'layout.row'
        ]
    },
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
            'markdown',
            'menu',
            'container',
            'chart.pie',
            'chart.simple_line',
            'breadcrumbs',
            'layout.row'
        ]
    },
    {
        name:      'Text node',
        type:      'text',
        component: {
            view: 'ContentTextNode',
            edit: 'ContentTextEditNode'
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
            edit: 'ContentTextEditNode'
        },
        accept:    null,
        defaults: {
            lang:    '',
            content: ''
        }
    },
    {
        name:      'Markdown node',
        type:      'markdown',
        component: {
            view: 'ContentMarkdownNode',
            edit: 'ContentMarkdownEditNode'
        },
        accept:    null,
        defaults: {
            content: ''
        }
    },

    //---------------------------------------------------------
    // NAV related types
    //---------------------------------------------------------
    {
        name:      'Breadcrumbs',
        type:      'breadcrumbs',
        component: {
            view: 'NavBreadcrumbsNode',
            edit: 'NavBreadcrumbsEditNode'
        },
        accept:    [
            'breadcrumbs.item'
        ]
    },
    {
        name:      'Breadcrumbs item',
        type:      'breadcrumbs.item',
        component: {
            view: 'NavBreadcrumbsItemNode',
            edit: 'NavBreadcrumbsItemEditNode'
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
    // DATA related types
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
    {
        name:      'Json API call',
        type:      'data.json_api_call',
        component: {
            view: 'DataJsonApiCallNode',
            edit: 'DataJsonApiCallEditNode'
        },
        accept:    null,
        defaults: {
            url:         '',
            httpMethod:  'GET',
            queryParams: {},
            headers:     {}
        }
    },

    //---------------------------------------------------------
    // LAYOUT related types
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
            'markdown',
            'menu',
            'container',
            'chart.pie',
            'chart.simple_line',
            'breadcrumbs'
        ]
    },

    //---------------------------------------------------------
    // DATA VIZ related types
    //---------------------------------------------------------
    {
        name:      'Pie chart',
        type:      'chart.pie',
        component: {
            view: 'ChartPieNode',
            edit: 'ChartPieEditNode'
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
    },
    {
        name:      'Simple line chart',
        type:      'chart.simple_line',
        component: {
            view: 'ChartSimpleLineNode',
            edit: 'ChartSimpleLineEditNode'
        },
        accept:    [
            'data.static_json',
            'data.json_api_call'
        ]
    }
];

/**
 *
 * @param types
 * @returns {*}
 */
exports.getTypes = function (types) {
    return _.filter(exports.all, function (type) {
        return _.contains(types, type.type);
    });
};

/**
 *
 * @param typeId
 * @returns {*}
 */
exports.getAllowedTypes = function (typeId) {
    var type = exports.getType(typeId);

    if (!type.accept) {
        return [];
    } else if (type.accept === '*') {
        return exports.all;
    }

    var accept = type.accept;
    if (!_.isArray(accept)) {
        accept = [accept];
    }

    return _.filter(exports.all, function (type) {
        return _.contains(accept, type.type);
    });
};

/**
 *
 * @param typeId
 * @returns {*}
 */
exports.getType = function (typeId) {
    for (var i = 0; i < exports.all.length; i++) {
        var type = exports.all[i];
        if (type.type === typeId) {
            return type;
        }
    }

    throw new Error('Unable to find a matching node type for type id: ' + typeId);
};