angular.module('protofight').directive('ploucDroppable', function() {
    return {
        scope: {
            drop: '&'
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

                scope.$apply(function (scope) {
                    var fn = scope.drop();
                    if ('undefined' !== typeof fn) {
                        fn(data);
                    }
                });

                return false;
            }, false);
        }
    }
});