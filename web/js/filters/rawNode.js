angular.module('protofight').filter('rawNode', [
    function (
    ) {
        function filterProps(node) {
            var nodeData = {};
            for (var p in node) {
                if (p == 'name' || p == 'depth' || p == '_id' || p == 'settings' || p == 'type') {
                    nodeData[p] = node[p];
                } else if (p == 'nodes') {
                    var nodes = node.nodes;
                    nodeData.nodes = [];
                    if (nodes.length > 0) {
                        node.nodes.forEach(function (subNode) {
                            nodeData.nodes.push(filterProps(subNode));
                        });
                    }
                }
            }

            return nodeData;
        }

        return function (node) {
            return filterProps(node);
        };
    }
]);