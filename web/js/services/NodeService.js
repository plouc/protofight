'use strict';

angular.module('protofight').factory('NodeService', [
    'Restangular',
    function (
        Restangular
    ) {
        var nodes = Restangular.all('nodes');

        return {
            root: function (params) {
                return nodes.customGET('root');
            },
            children: function (id) {
                return nodes.one(id).getList('children');
            },
            nodes: function (params) {
                return apps.getList(params);
            },
            node: function (id) {
                return nodes.get(id);
            },
            saveNode: function (node) {
                if (node._id) {
                    return node.put();
                }

                return nodes.post(node);
            }
        };
    }
]);