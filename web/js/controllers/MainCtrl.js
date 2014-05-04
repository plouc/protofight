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
            }
        ];

        $scope.viewMode = 'live';

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
                console.log(page);
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

            node.nodes.push(newNode);
            NodeService.saveNode(newNode).then(function (node) {
                _.assign(newNode, node);
                console.log(newNode);
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