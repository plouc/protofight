angular.module('protofight').directive('ploucDraggable', function() {
    return {
        scope: {
            dragData: '='
        },
        link: function (scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', JSON.stringify(scope.dragData));
                this.classList.add('drag');

                return false;
            }, false);

            el.addEventListener('dragend', function (e) {
                this.classList.remove('drag');

                return false;
            }, false);
        }
    }
});