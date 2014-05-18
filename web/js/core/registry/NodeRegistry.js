'use strict';

var _ = require('lodash');

var _componentRegistry = {};

exports.register = function (config) {
    _componentRegistry[config.type] = config;
};


exports.getTypes = function (types) {
    var result = [];
    types.forEach(function (type) {
        result.push(exports.getTypeConfig(type));
    });

    return result;
};

exports.getTypeConfig = function (type) {
    if (!_componentRegistry[type]) {
        throw new Error('Unable to find a matching node type for type: ' + type);
    }

    return _componentRegistry[type];
};

/**
 *
 * @param typeId
 * @returns {*}
 */
exports.getAllowedTypes = function (type) {
    var typeConfig = exports.getTypeConfig(type);

    if (!typeConfig.accept) {
        return [];
    } else if (typeConfig.accept === '*') {
        return exports.all;
    }

    var accept = typeConfig.accept;
    if (!_.isArray(accept)) {
        accept = [accept];
    }

    return exports.getTypes(accept);
};

/**
 * Returns matching react component for given node in given mode (view/edit).
 *
 * @param {object} node
 * @param {string} mode
 * @returns {*}
 */
exports.getComponent = function (node, mode, app) {
    var type = exports.getTypeConfig(node.type);

    if (!type.component || !type.component[mode]) {
        throw new Error('Unable to instantiate component for type "' + type.type + '" with mode "' + mode + '"');
    }

    return type.component[mode]({
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
exports.getNodeChildComponents = function (node, mode, app) {
    var children = [];
    node.nodes.forEach(function (childNode) {
        children.push(exports.getComponent(childNode, mode, app));
    });

    return children;
};