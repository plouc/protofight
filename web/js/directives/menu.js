angular.module('protofight').directive('menu', [
    'NodeService',
    function(
        NodeService
    ) {
        return {
            scope: {
                menu: '='
            },
            controller: function ($scope, $element) {
                if (!$scope.menu.settings) {
                    $scope.menu.settings = {};
                }
                if (!$scope.menu.settings.items) {
                    $scope.menu.settings.items = [{ id: 'test' }];
                }
            }
        }
    }
]);