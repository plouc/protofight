angular.module('protofight').directive('ploucNode', [
    '$compile',
    '$http',
    '$templateCache',
    function (
        $compile,
        $http,
        $templateCache
    ) {
        var getTemplate = function (nodeType) {
            return $http.get('/views/node/' + nodeType + '.html', {
                cache: $templateCache
            });
        };

        var linker = function (scope, element, attrs) {

            console.log(scope);

            getTemplate(scope.node.type).success(function (html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        };

        return {
            restrict:   'E',
            replace:    true,
            link:       linker,
            transclude: true,
            scope: {
                node: '='
            }
        };
    }
]);
