'use strict';

var NodeRegistry    = require('../../core/registry/NodeRegistry');
var NavMenuNode     = require('./NavMenuNode.jsx');
var NavMenuEditNode = require('./NavMenuEditNode.jsx');


NodeRegistry.register({
    name: 'Menu',
    type: 'nav.menu',
    accept:   [
        'nav.menu_item'
    ],
    component: {
        view: NavMenuNode,
        edit: NavMenuEditNode
    }
});