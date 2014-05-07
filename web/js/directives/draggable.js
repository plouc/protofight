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
                e.dataTransfer.setData('text/plain', JSON.stringify(scope.dragData));
                e.dataTransfer.setData('text/type:' + scope.dragData.type, '');

                this.classList.add('drag');

                return false;
            }, false);

            el.addEventListener('dragend', function (e) {
                this.classList.remove('drag');

                event.preventDefault();
                return false;
            }, false);
        }
    }
});