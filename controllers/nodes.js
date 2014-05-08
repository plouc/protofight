var mongoose = require('mongoose');
var Node     = mongoose.model('Node');
var extend   = require('util')._extend;
var index    = require('../lib/index').index;

exports.list = function (req, res) {
    Node
        .find()
        .sort({'name': 1})
        .limit(30)
        .exec(function (err, nodes) {
            if (err) {
                res.status(500);
                return res.send({ status : 500 });
            }

            res.json(nodes);
        });
};

exports.root = function (req, res) {
    Node.findRoot(function (err, root) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        if (!root) {
            console.log('no root, creating one…');
            var root = new Node({
                name:  'root',
                type:  'container',
                depth: 0
            });
            root.save(function (err, root) {
                if (err) {
                    res.status(500);
                    return res.send({ status : 500 });
                }

                res.json(root);
            });
        } else {
            res.json(root);
        }
    });
};

exports.create = function (req, res) {
    var node = new Node(req.body);
    node.save(function (err, node) {
        if (err) {
            console.error(err);
            res.status(500);
            return res.send({ status : 500 });
        }

        //index.add(node);

        res.json(node);
    });
};

exports.update = function (req, res) {
    var nodeUpdate = req.body;
    Node.findById(req.params.id, function (err, node) {
        if (err) {
            console.error(err);
            res.status(500);
            return res.send({ status : 500 });
        }

        node.name = nodeUpdate.name;
        if (nodeUpdate.settings) {
            node.settings = nodeUpdate.settings;
        }
        node.save(function (err) {
            if (err) {
                console.error(err);
                res.status(500);
                return res.send({ status : 500 });
            }

            res.json(node);
        });
    });
};

exports.pick = function (req, res) {
    Node.find({
        '_id': { $in: req.query.ids }
    }, function (err, nodes) {
        var result = {};
        nodes.forEach(function (node) {
            result[node._id] = node;
        });

        res.json(result);
    });
};

exports.search = function (req, res) {
    var criteria = {};
    if (req.query.q) {
        criteria.name = { '$regex': '^' + req.query.q };
    }

    Node.find(criteria, function (err, nodes) {
        res.json(nodes);
    });
};

exports.children = function (req, res) {
    Node.findChildren(req.params.id, function (err, children) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        res.json(children);
    })
};

function deepNodeRemoval(node, res) {
    Node.remove({ ancestors: node._id }, function (err) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        node.remove(function (err) {
            if (err) {
                res.status(500);
                return res.send({ status : 500 });
            }

            res.status(204);
            return res.end();
        });
    });
};

exports.delete = function (req, res) {
    Node.findById(req.params.id, function (err, node) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        if (!node) {
            res.status(404);
            return res.send({ status : 404 });
        }

        if (node.parent) {
            Node.update(
                { '_id': node.parent },
                { $pull: { 'nodes': node._id } },
                function (err, removedCount) {
                    if (err) {
                        res.status(500);
                        return res.send({ status : 500 });
                    }

                    deepNodeRemoval(node, res);
                }
            );
        } else {
            deepNodeRemoval(node, res);
        }
    });
};