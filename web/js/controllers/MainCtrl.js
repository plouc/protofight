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
                name: 'Text node'
            }
        ];

        $scope.createNode = function (nodeSpec) {
            WS.send(nodeSpec);
            console.log('nodeSpec', nodeSpec);
        };
    }
]);