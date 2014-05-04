var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var NodeSchema = new Schema({
    name:   { type: String, default: '' },
    parent: { type: Schema.Types.ObjectId, ref: 'Node', default: null },
    type:   { type: String, default: '' },
    depth:  { type: Number },
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
                parent.nodes.push(node);

                next();
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

NodeSchema.statics.findChildren = function (id, cb) {
    this.find({ parent: id }, cb);
};

mongoose.model('Node', NodeSchema);

module.exports = mongoose.model('Node');