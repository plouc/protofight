'use strict';

var NodeRegistry        = require('../../core/registry/NodeRegistry');
var NavMenuItemNode     = require('./NavMenuItemNode.jsx');
var NavMenuItemEditNode = require('./NavMenuItemEditNode.jsx');


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