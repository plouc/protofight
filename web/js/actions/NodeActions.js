'use strict';

//var AppDispatcher = require('../dispatcher/AppDispatcher');
var NodeConstants = require('../constants/NodeConstants');

var NodeActions = {

    /**
     * @param  {string} text
     */
    create: function(text) {
        AppDispatcher.handleViewAction({
            actionType: NodeConstants.NODE_CREATE,
            text: text
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
                actionType: TodoConstants.TODO_UNDO_COMPLETE,
                id: id
            });
        } else {
            AppDispatcher.handleViewAction({
                actionType: TodoConstants.TODO_COMPLETE,
                id: id
            });
        }
    },

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: function() {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    },

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: function() {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY_COMPLETED
        });
    }

};

module.exports = TodoActions;