'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var NodeConstants = require('../constants/NodeConstants');

var NodeActions = {

    /**
     * @param  {string} text
     */
    create: function (text) {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.NODE_CREATE,
            text: text
        });
    },

    createChildNode: function (node, type) {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.NODE_CHILD_CREATE,
            node:       node,
            type:       type
        });
    },

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: function(todo) {
        var id = todo.id;
        if (todo.complete) {
            AppDispatcher.handleViewAction({
                actionType: NodeConstants.TODO_UNDO_COMPLETE,
                id: id
            });
        } else {
            AppDispatcher.handleViewAction({
                actionType: NodeConstants.TODO_COMPLETE,
                id: id
            });
        }
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function() {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.TODO_DESTROY_COMPLETED
        });
    }

};

module.exports = NodeActions;