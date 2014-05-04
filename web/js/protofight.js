angular.module('protofight', [
    'restangular',
    'ngSanitize'
]);

angular.module('protofight').config(function () {
});

angular.module('protofight').config([
    'RestangularProvider',
    function (
        RestangularProvider
    ) {
        RestangularProvider.setRestangularFields({
            id: '_id'
        });
    }
]);

angular.module('protofight').run([
    'WS',
    function (
        WS
    ) {
        WS.on('open', function(){
            WS.on('message', function(data){
                console.log(data);
            });
            WS.on('close', function(){});
        });
    }
]);