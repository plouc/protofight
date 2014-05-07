angular.module('protofight').directive('ploucDroppable', [
    'NodeService',
    function (
        NodeService
    ) {
        function checkDroppable(node, e) {
            var sourceType;
            e.dataTransfer.types.forEach(function (type) {
                if (type.indexOf('text/type:') === 0) {
                    sourceType = type.substring(10);
                }
            });

            return (sourceType && NodeService.nodeAccepts(node, sourceType));
        }

        return {
            scope: {
                drop: '=',
                node: '='
            },
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener('dragover', function (e) {
                    e.dataTransfer.dropEffect = 'move';

                    if (checkDroppable(scope.node, e)) {
                        this.classList.add('over');

                        e.preventDefault();
                        return false;
                    }
                }, false);

                el.addEventListener('dragenter', function (e) {
                    var sourceType;
                    e.dataTransfer.types.forEach(function (type) {
                        if (type.indexOf('text/type:') === 0) {
                            sourceType = type.substring(10);
                        }
                    });

                    if (checkDroppable(scope.node, e)) {
                        this.classList.add('over');

                        e.preventDefault();
                        return false;
                    }
                }, false);

                el.addEventListener('dragleave', function (e) {
                    this.classList.remove('over');

                    return false;
                }, false);

                el.addEventListener('drop', function (e) {
                    this.classList.remove('over');

                    var data = JSON.parse(e.dataTransfer.getData('text/plain'));

                    if (NodeService.nodeAccepts(scope.node, data.type)) {

                        console.log('accepted', data);

                        var newNode = {
                            name:     data.name,
                            type:     data.type,
                            settings: data.defaults || {}
                        };
                        if (newNode.type === 'container') {
                            newNode.nodes = [];
                        }

                        scope.drop(scope.node, newNode);
                    } else {
                        console.log('rejected', data);
                    }

                    e.stopPropagation();
                    return false;
                }, false);
            }
        }
    }
]);