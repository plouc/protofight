angular.module('protofight').directive('breadcrumbs', [
    'NodeService',
    function(
        NodeService
    ) {
        return {
            scope: false,
            controller: function ($scope, $element) {
                $scope.breadcrumbs = [];
                var ancestors = $scope.node.ancestors;
                NodeService.pick(ancestors).then(function (nodes) {
                    ancestors.forEach(function (id) {
                        if (nodes[id]) {
                            $scope.breadcrumbs.push(nodes[id]);
                        }
                    });
                });
            }
        }
    }
]);