'use strict';

function NodeRegistry() {
    this._componentRegistry = {};
}

NodeRegistry.prototype.register = function (type, component) {
    this._componentRegistry[type] = component;
};

NodeRegistry.prototype.getComponent = function (type) {
    return this._componentRegistry[type];
};