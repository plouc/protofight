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
            pick: function (ids) {
                return nodes.customGET('pick', {
                    ids: ids
                });
            },
            node: function (id) {
                return nodes.get(id);
            },
            remove: function (id) {
                return nodes.one(id).customDELETE('');
            },
            saveNode: function (node) {
                if (node._id) {
                    return nodes.one(node._id).customPUT(node);
                }

                return nodes.post(node);
            }
        };
    }
]);