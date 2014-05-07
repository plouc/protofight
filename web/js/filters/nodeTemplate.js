angular.module('protofight').filter('nodeTemplate', [
    'NodeService',
    '_',
    function (
        NodeService,
        _
    ) {
        return function (node) {


            console.log(node);

            var type = _.first(NodeService.types, function (spec) {
                return spec.type === node.type;
            });

            console.log(type);
        };
    }
]);