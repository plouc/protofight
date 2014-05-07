'use strict';

angular.module('protofight').factory('NodeService', [
    'Restangular',
    '_',
    function (
        Restangular,
        _
    ) {
        var buffer = {};

        function collect(node) {
            if (node._id) {
                buffer[node._id] = node;
            }
            if (node.nodes && node.nodes.length > 0) {
                node.nodes.forEach(function (childNode) {
                    if (!_.isString(childNode)) {
                        collect(childNode);
                    }
                });
            }
        }

        var types = [
            {
                name:     'Text node',
                type:     'text',
                template: 'text',
                accept:   null,
                defaults: {
                    content: ''
                }
            },
            {
                name:     'Code node',
                type:     'code',
                template: 'code',
                accept:   null,
                defaults: {
                    lang:    '',
                    content: ''
                }
            },
            {
                name:     'Node container',
                type:     'container',
                template: 'container',
                accept:   [
                    'code',
                    'text',
                    'menu',
                    'container',
                    'chart',
                    'breadcrumbs',
                    'layout.row'
                ]
            },
            {
                name:     'Breadcrumbs',
                type:     'breadcrumbs',
                template: 'breadcrumbs',
                accept:   null
            },
            {
                name:     'Menu',
                type:     'menu',
                template: 'menu',
                accept:   'menu.item'
            },
            {
                name:     'Menu item',
                type:     'menu.item',
                template: 'menu-item',
                accept:   null
            },
            {
                name:     'Chart',
                type:     'chart',
                template: 'chart',
                accept:   ['data.static_json']
            },
            {
                name:     'Static json',
                type:     'data.static_json',
                template: 'data/static_json',
                accept:   null,
                defaults: {
                    content: '{}'
                }
            },
            {
                name:     'Row',
                type:     'layout.row',
                template: 'layout/row',
                defaults: {
                    columns: 12
                },
                accept:   [
                    'layout.cell'
                ]
            },
            {
                name:     'Cell',
                type:     'layout.cell',
                template: 'layout/cell',
                defaults: {
                    columns:     12,
                    offsetLeft:  0,
                    offsetRight: 0
                },
                accept:   [
                    'code',
                    'text',
                    'menu',
                    'container',
                    'chart',
                    'breadcrumbs'
                ]
            }
        ];

        function typeByNode(node) {
            for (var i = 0; i < types.length; i ++) {
                var spec = types[i];
                if (spec.type === node.type) {
                    return spec;
                }
            }
        }

        var nodes = Restangular.all('nodes');

        return {
            types: types,
            nodeTemplate: function (node) {
                var type = typeByNode(node);

                return type.template;
            },
            nodeAccepts: function (targetNode, sourceType) {
                var type = typeByNode(targetNode);
                if (!type.accept) {
                    return false;
                } else if (type.accept === '*') {
                    return true;
                }

                var accept = type.accept;
                if (!_.isArray(accept)) {
                    accept = [accept];
                }

                return _.contains(accept, sourceType);
            },
            root: function (params) {
                var p = nodes.customGET('root');
                p.then(function (node) {
                    collect(node);
                });

                return p;
            },
            children: function (id) {
                var p = nodes.one(id).getList('children');
                p.then(function (nodes) {
                    nodes.forEach(function (node) {
                        collect(node);
                    });
                });

                return p;
            },
            pick: function (ids) {
                var p = nodes.customGET('pick', { ids: ids });
                p.then(function (nodes) {
                    nodes = Restangular.stripRestangular(nodes);
                    for (var id in nodes) {
                        collect(nodes[id]);
                    }
                });

                return p;
            },
            search: function (params) {
                var p = nodes.all('search').getList(params);

                return p;
            },
            node: function (id) {
                var p = nodes.get(id);
                p.then(function (node) {
                    collect(node);
                });

                return p;
            },
            remove: function (id) {
                if (buffer[id]) {
                    if (buffer[id].parent && buffer[buffer[id].parent]) {
                        var parent = buffer[buffer[id].parent];
                        parent.nodes = _.remove(parent.nodes, function (child) {
                            return child._id !== id;
                        });
                    }
                    delete buffer[id];
                }

                return nodes.one(id).customDELETE('');
            },
            saveNode: function (node) {
                var p;
                if (node._id) {
                    return nodes.one(node._id).customPUT(node);
                }

                p = nodes.post(node);
                p.then(function (node) {
                    collect(node);
                });

                return p;
            }
        };
    }
]);