function Node(config) {
    config = config || {};
}

Node.types = {

};

Node.prototype.accepts = function (type) {
    if (!this.acceptTypes) {
        return false;
    } else if (this.acceptTypes === '*') {
        return true;
    }

    var acceptTypes = this.acceptTypes;
    if (!_.isArray(acceptTypes)) {
        var acceptTypes = [acceptTypes];
    }

    return _.contains(acceptTypes, type);
};