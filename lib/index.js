var elasticsearch = require('elasticsearch');

function Index(config) {
    this.index = config.index;
    this.nodeType = 'node';
    this.client = new elasticsearch.Client({
        host: config.host,
        log:  config.logLevel
    });

    this.ensureIndexCreated(function () {
        /*
         ignoreConflicts        Boolean      — Specify whether to ignore conflicts while updating the mapping (default: false)
         timeout                Date, Number — Explicit operation timeout
         masterTimeout          Date, Number — Specify timeout for connection to master
         ignoreUnavailable      Boolean      — Whether specified concrete indices should be ignored when unavailable (missing or closed)
         allowNoIndices         Boolean      — Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes _all string or when no indices have been specified)
         index                  String, String[], Boolean — A comma-separated list of index names the mapping should be added to (supports wildcards); use _all or omit to add the mapping on all indices.
         type                   String       — The name of the document type
         [expandWildcards=open] String       — Whether to expand wildcard expression to concrete indices that are open, closed or both.
         Options: "open" "closed"
         */
         this.client.indices.putMapping({
            ignoreConflicts: false,
            index:           this.index,
            type:            this.nodeType,
            body: {
                node: {
                    properties: {
                        mongoId: {
                            type: 'string',
                            store: true
                        },
                        name: {
                            type: 'string',
                            store: true
                        },
                        type: {
                            type: 'string',
                            store: true
                        }
                    }
                }
            }
         });
    }.bind(this));
};

Index.prototype.ensureIndexCreated = function (cb) {
    this.client.indices.exists({ index: this.index }, function (err, exists) {
        if (!exists) {
            this.client.indices.create({
                index: this.index
            });
        } else {
            cb();
        }
    }.bind(this));
};

Index.prototype.add = function (node) {
    this.client.index({
        index: this.index,
        type:  this.nodeType,
        id:    node._id + '',
        body:  {
            mongoId: node._id,
            name:    node.name,
            type:    node.type
        }
    }, function (err, res) {
        console.log(err, res);
    });
}

exports.index = null;

exports.create = function (config) {
    if (!exports.index) {
        exports.index = new Index(config);
    }
};