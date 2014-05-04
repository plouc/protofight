var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var NodeSchema = new Schema({
    name:      { type: String, default: '' },
    parent:    { type: Schema.Types.ObjectId, ref: 'Node', default: null },
    type:      { type: String, default: '' },
    depth:     { type: Number },
    ancestors: [
        {
            type: Schema.Types.ObjectId,
            ref:  'Node'
        }
    ],
    nodes:  [
        {
            type: Schema.Types.ObjectId,
            ref:  'Node'
        }
    ]
});

NodeSchema.pre('save', function (next) {
    var node = this;

    if (node.isNew) {
        if (node.parent) {
            mongoose.model('Node').findById(node.parent, function (err, parent) {
                if (err) {
                    console.error(err);
                }

                node.depth = parent.depth + 1;
                node.ancestors = parent.ancestors.concat(parent._id);

                parent.nodes.push(node);
                parent.save(function (err, parent) {
                    next();
                });
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

NodeSchema.statics.findRoot = function (cb) {
    this.findOne({ parent: null }, cb);
};

function buildTree(nodes, cb) {

    var byDepth     = {};
    var lowestDepth = null;
    var byId        = {};

    nodes.forEach(function (node) {
        if (!byDepth[node.depth]) {
            byDepth[node.depth] = [];
        }
        byDepth[node.depth].push(node);
        if (lowestDepth === null || node.depth < lowestDepth) {
            lowestDepth = node.depth;
        }

        byId[node._id] = node;
    });

    for (var depth in byDepth) {
        var depthNodes = byDepth[depth];
        depthNodes.forEach(function (node) {
            if (node.nodes && node.nodes.length > 0) {
                node.nodes.forEach(function (childNodeId, index) {
                    node.nodes[index] = byId[childNodeId];
                });
            }
        });
    }

    cb(null, byDepth[lowestDepth]);
};

NodeSchema.statics.findChildren = function (id, cb) {
    var query = this
        .find({ ancestors: id })
        .sort({'name': 1});

    query.exec(function (err, nodes) {
        buildTree(nodes, cb);
    }.bind(this));
};

mongoose.model('Node', NodeSchema);

module.exports = mongoose.model('Node');