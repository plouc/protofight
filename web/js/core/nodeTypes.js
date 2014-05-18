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

    return exports.getTypes(accept);
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