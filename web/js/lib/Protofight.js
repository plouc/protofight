'use strict';

var $             = require('jquery');
var EventEmitter  = require('events').EventEmitter;
var nodeTypes     = require('./nodeTypes');
var React         = require('react');
var NodeConstants = require('../constants/NodeConstants');

function Protofight (config) {
    EventEmitter.call(this);
    this.currentNode = null;

    // Due to:
    //   warning:
    //     possible EventEmitter memory leak detected.
    //     11 listeners added.
    //     Use emitter.setMaxListeners() to increase limit.
    //
    this.setMaxListeners(200);

    this.on(NodeConstants.NODE_DESTROY, function (node) {
        this.remove(node).then(function () {
            this.emit(NodeConstants.NODE_DESTROYED, node);
        }.bind(this));
    }.bind(this));

    this.on(NodeConstants.NODE_FETCH, function (id) {
        this.children(id).then(function (node) {
            this.emit(NodeConstants.NODE_FETCHED, node);
        }.bind(this));
    }.bind(this));

    this.on(NodeConstants.NODE_LIST_FETCH, function () {
        this.listNodes().then(function (nodes) {
            this.emit(NodeConstants.NODE_LIST_FETCHED, nodes);
        }.bind(this));
    }.bind(this));

    this.on(NodeConstants.NODE_SEARCH_QUERY, function (term) {
        this.search(term).then(function (nodes) {
            this.emit(NodeConstants.NODE_SEARCH_RESULT, nodes);
        }.bind(this));
    }.bind(this));
}

Protofight.prototype = new EventEmitter;

Protofight.prototype.listNodes = function (params) {
    var p = $.ajax({
        url:  '/nodes',
        data: params
    });

    p.done(function (nodes) {
        this.augmentNodes(nodes);
    }.bind(this));

    return p;
};

Protofight.prototype.search = function (query) {
    var promise = $.ajax({
        url:  '/nodes',
        data: {
            term: query
        }
    });

    return promise;
};

Protofight.prototype.children = function (node) {
    var nodeId;
    if (node instanceof Object) {
        nodeId = node._id;
    } else {
        nodeId = node;
    }

    var promise = $.ajax({
        url: '/nodes/' + nodeId + '/children'
    });

    promise.then(function (node) {
        this.augmentNode(node);
    }.bind(this));

    return promise;
};

Protofight.prototype.create = function (type, parent) {
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

    var promise = $.ajax({
        url:         '/nodes',
        method:      'POST',
        contentType: 'application/json',
        data:        JSON.stringify(newNode)
    });

    promise.then(function (node) {
        this.augmentNode(newNode);
        if (parent && parent._id) {
            parent.nodes.push(node);
            this.emit(NodeConstants.NODE_UPDATE, parent);
        }
        this.emit(NodeConstants.NODE_CREATED, node);
    }.bind(this));

    return promise;
};

/**
 * @param node
 * @returns {*}
 */
Protofight.prototype.save = function (node) {
    var promise = $.ajax({
        url:         '/nodes/' + node._id,
        method:      'PUT',
        contentType: 'application/json',
        data:        JSON.stringify(node)
    });

    promise.then(function (node) {
        this.augmentNode(node);
        this.emit(NodeConstants.NODE_UPDATE, node);
    }.bind(this));

    return promise;
};

/**
 *
 * @param nodeId
 */
Protofight.prototype.remove = function (node) {
    var promise = $.ajax({
        url:    '/nodes/' + node._id,
        method: 'DELETE'
    });

    return promise;
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
    switch (node.type) {
        case 'breadcrumbs':
            node.getItems = function () {
                return $.ajax({
                    url: '/nodes/pick',
                    data: {
                        ids: node.ancestors
                    }
                });
            };
            break;

        case 'data.json_api_call':
            node.hasValidSettings = function () {
                if (this.settings.httpMethod && this.settings.httpMethod !== ''
                 && this.settings.url && this.settings.url !== '') {
                    return true;
                }

                return false;
            };

            node.getData = function () {
                if (!this.hasValidSettings()) {
                    throw new Error('Invalid settings detected, unable to fetch data.');
                }

                return $.ajax({
                    url:    this.settings.url,
                    method: this.settings.httpMethod
                });
            };
            break;

        default:
            break;
    }

    /*
    node.getFirstChildOfType = function (typeId) {
        if (!node.nodes || node.nodes.length === 0) {
            return null;
        }

        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            if (child.type === typeId) {
                return child;
            }
        }
    };
    */

    if (node.nodes && node.nodes.length > 0) {
        this.augmentNodes(node.nodes);
    }
};

module.exports = Protofight;