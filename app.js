var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('engine.io').attach(server);

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res, next){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.on('message', function (message) {
        console.log(message);
        socket.send('pong');
    });
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log('\033[96mlistening on localhost:' + port + ' \033[39m');
});