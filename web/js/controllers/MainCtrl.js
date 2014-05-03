'use strict';

angular.module('protofight').controller('MainCtrl', [
    '$scope',
    'WS',
    function (
        $scope,
        WS
    ) {
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

        $scope.pages = [
            {
                name: 'Home',
                type: 'container',
                nodes: []
            },
            {
                name: 'FAQ',
                type: 'container',
                nodes: []
            },
            {
                name: 'Contact',
                type: 'container',
                nodes: []
            },
            {
                name: 'About',
                type: 'container',
                nodes: []
            }
        ];
        $scope.setPage = function (pageNode) {
            $scope.pageNode = pageNode;
        };

        $scope.createNode = function (node, nodeSpec) {
            console.log('createNode', node, nodeSpec);
            var newNode = {
                name:  nodeSpec.name,
                type:  nodeSpec.type
            };

            if (newNode.type === 'container') {
                newNode.nodes = [];
            }

            node.nodes.push(newNode);
            WS.send(newNode);
        };
    }
]);