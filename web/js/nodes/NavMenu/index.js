'use strict';

var NodeRegistry    = require('../../core/registry/NodeRegistry');
var NavMenuNode     = require('./components/NavMenuNode.jsx');
var NavMenuEditNode = require('./components/NavMenuEditNode.jsx');
var NavMenuItemNode     = require('./components/NavMenuItemNode.jsx');
var NavMenuItemEditNode = require('./components/NavMenuItemEditNode.jsx');


NodeRegistry.register({
    name: 'Menu item',
    type: 'nav.menu_item',
    accept:   [
        'nav.menu_item'
    ],
    component: {
        view: NavMenuItemNode,
        edit: NavMenuItemEditNode
    }
});


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