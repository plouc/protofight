'use strict';

angular.module('protofight').controller('MainCtrl', [
    '$scope',
    '_',
    'NodeService',
    'WS',
    function (
        $scope,
        _,
        NodeService,
        WS
    ) {

        $scope.pages = [];
        NodeService.root().then(function (root) {
            $scope.root = root;
            $scope.root.getList('children').then(function (children) {
                $scope.pages = children;
                $scope.node  = $scope.pages[0];
            });
        });

        $scope.components = [
            {
                name: 'Text node',
                type: 'text'
            },
            {
                name: 'Code node',
                type: 'code'
            },
            {
                name: 'Node container',
                type: 'container'
            },
            {
                name: 'Breadcrumb',
                type: 'breadcrumbs'
            },
            {
                name: 'Navigation',
                type: 'nav'
            }
        ];

        $scope.viewMode = 'struct';

        $scope.setPage = function (pageNode) {
            $scope.node = pageNode;
        };

        $scope.createPage = function () {
            var page = {
                name:   'New page',
                type:   'container',
                nodes:  [],
                parent: $scope.root._id
            };

            $scope.pages.push(page);

            NodeService.saveNode(page).then(function (node) {
                _.assign(page, node);
            });
        };


        $scope.saveNode = function (node) {
            console.log('saving node', node);
            NodeService.saveNode(node).then(function (savedNode) {
                node.updatedAt = savedNode.updatedAt;
            });
        };

        $scope.removeNode = function (node) {
            NodeService.remove(node._id).then(function () {

            });
        };

        $scope.createNode = function (node, nodeSpec) {
            console.log('createNode', node, nodeSpec);
            var newNode = {
                name:       nodeSpec.name,
                type:       nodeSpec.type,
                processing: true,
                parent:     node._id
            };

            if (newNode.type === 'container') {
                newNode.nodes = [];
            }

            NodeService.saveNode(newNode).then(function (savedNode) {
                _.assign(newNode, savedNode);
                node.nodes.push(savedNode);
            });

            /*
            WS.send(JSON.stringify({
                action:  'node.new',
                payload: newNode
            }));
            */
        };
    }
]);