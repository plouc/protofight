angular.module('protofight').factory('WS', [
    '$window',
    function (
        $window
    ) {
        return $window.eio.Socket('ws://localhost:3000');
    }
]);