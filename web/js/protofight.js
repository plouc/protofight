angular.module('protofight', []);

angular.module('protofight').config(function () {
});

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