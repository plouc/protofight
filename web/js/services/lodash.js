angular.module('protofight').factory('_', [
    '$window',
    function ($window) {
        // place lodash include before angular
        return $window._;
    }
]);