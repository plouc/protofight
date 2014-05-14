'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var NodeConstants = require('../constants/NodeConstants');
var merge         = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _todos = {};
var _current;
var _nodes = [];
var fetching = false;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp in place of a real id.
    var id = Date.now();
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _todos[id] = merge(_todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}

var NodeStore = merge(EventEmitter.prototype, {

    /**
     * Tests whether all the remaining TODO items are marked as completed.
     * @return {booleam}
     */
    areAllComplete: function () {
        for (id in _todos) {
            if (!_todos[id].complete) {
                return false;
                break;
            }
        }
        return true;
    },

    getCurrent: function () {
        return _current;
    },

    refreshNodes: function () {
        var protofight = require('../lib/Protofight').protofight();

        protofight.listNodes().then(function (nodes) {
            _nodes = nodes;
            this.emitChange();
        }.bind(this));
    },

    /**
     * Get the entire collection of Nodes.
     *
     * @return {object}
     */
    getNodes: function () {
        return _nodes;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch (action.actionType) {
        case NodeConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            break;

        case NodeConstants.NODE_CHILD_CREATE:
            var protofight = require('../lib/Protofight').protofight();

            protofight.createNode(action.type, action.node).then(
                function (node) {
                    NodeStore.refreshNodes();
                }
            );

            break;

        case NodeConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                updateAll({complete: false});
            } else {
                updateAll({complete: true});
            }
            break;

        case NodeConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            break;

        case NodeConstants.TODO_COMPLETE:
            update(action.id, {complete: true});
            break;

        case NodeConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
            }
            break;

        case NodeConstants.TODO_DESTROY:
            destroy(action.id);
            break;

        case NodeConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted();
            break;

        default:
            return true;
    }

    // This often goes in each case that should trigger a UI change. This store
    // needs to trigger a UI change after every view action, so we can make the
    // code less repetitive by putting it here.  We need the default case,
    // however, to make sure this only gets called after one of the cases above.
    NodeStore.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = NodeStore;