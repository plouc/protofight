var mongoose = require('mongoose');
var Node     = mongoose.model('Node');
var extend   = require('util')._extend;

/*
exports.index = function (req, res) {
    App.list({}, function (err, apps) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        res.json(apps);
    });
};
*/

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

    console.log(req.body);

    var node = new Node(req.body);
    node.save(function (err, node) {
        if (err) {
            console.error(err);
            res.status(500);
            return res.send({ status : 500 });
        }

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

exports.children = function (req, res) {
    Node.findChildren(req.params.id, function (err, children) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        res.json(children);
    })
};

exports.delete = function (req, res) {
    App.findById(req.params.id, function (err, app) {
        if (err) {
            res.status(500);
            return res.send({ status : 500 });
        }

        Api.remove({ app: app._id }, function (err) {
            if (err) {
                res.status(500);
                return res.send({ status : 500 });
            }
        });

        app.remove(function (err) {
            if (err) {
                res.status(500);
                return res.send({ status : 500 });
            }

            res.status(204);
            return res.end();
        });
    });
};