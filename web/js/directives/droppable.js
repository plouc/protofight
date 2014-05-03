angular.module('protofight').directive('ploucDroppable', function() {
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
                e.preventDefault(); // allows us to drop
                this.classList.add('over');

                return false;
            }, false);

            el.addEventListener('dragenter', function (e) {
                this.classList.add('over');

                return false;
            }, false);

            el.addEventListener('dragleave', function (e) {
                this.classList.remove('over');

                return false;
            }, false);

            el.addEventListener('drop', function (e) {
                e.stopPropagation();

                this.classList.remove('over');

                var rawData = e.dataTransfer.getData('Text');
                var data = JSON.parse(rawData);

                var newNode = {
                    name:     data.name,
                    type:     data.type,
                    settings: {}
                };
                if (newNode.type === 'container') {
                    newNode.nodes = [];
                }

                scope.$apply(function (scope) {
                    scope.node.nodes.push(newNode);
                });

                return false;
            }, false);
        }
    }
});