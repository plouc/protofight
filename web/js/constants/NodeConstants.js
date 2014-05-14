'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
    NODE_CREATE:              null,
    NODE_COMPLETE:            null,
    NODE_DESTROY:             null,
    NODE_DESTROY_COMPLETED:   null,
    NODE_TOGGLE_COMPLETE_ALL: null,
    NODE_UNDO_COMPLETE:       null,
    NODE_UPDATE_TEXT:         null
});