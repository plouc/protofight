'use strict';

module.exports = {
    getChildrenNodes: function (mode) {
        var protofight = require('../lib/Protofight').protofight();

        return protofight.buildChildNodeList(this.props.node, mode);
    }
};