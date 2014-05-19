'use strict';

var $             = require('jquery');
var EventEmitter  = require('events').EventEmitter;
var nodeTypes     = require('./nodeTypes');
var React         = require('react');
var NodeConstants = require('./constants/NodeConstants');
var NodeRegistry  = require('./registry/NodeRegistry');

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

    //p.done(function (nodes) {
    //    this.augmentNodes(nodes);
    //}.bind(this));

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
    var type = NodeRegistry.getTypeConfig(node.type);
    if (type.augment) {
        type.augment(node);
    }

    if (node.nodes && node.nodes.length > 0) {
        this.augmentNodes(node.nodes);
    }
};

module.exports = Protofight;