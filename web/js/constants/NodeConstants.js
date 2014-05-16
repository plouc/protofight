'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
    NODE_UPDATE:       null,
    NODE_CREATE:       null,
    NODE_CREATED:      null,
    NODE_CHILD_CREATE: null,
    NODE_COMPLETE:     null,
    NODE_DESTROY:      null,
    NODE_DESTROYED:    null,
    NODE_FETCH:        null,
    NODE_FETCHED:      null
});