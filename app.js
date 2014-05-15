var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var io       = require('engine.io').attach(server);
var Node     = require('./models/Node');
var env      = process.env.NODE_ENV || 'development';
var config   = require('./config/config')[env];
var mongoose = require('mongoose');
var index    = require('./lib/index');

// try to use heroku mongolab addon env var or use config
var mongoUrl = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : config.mongoose.url;

var connectMongo = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(mongoUrl, options);
};
connectMongo();

//index.create(config.elasticsearch);

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/web'));
app.get('/', function(req, res, next){
    res.sendfile('index.html');
});
require('./config/routing')(app);

function createNode(nodeData, io) {
    console.log('saving node', nodeData);
    var node = new Node(nodeData);
    node.save(function (err) {
        if (err) {
            console.error(err);
        }

        console.log('node saved', node);
    });
};

io.on('connection', function (socket) {
    console.log('connection');
    socket.on('message', function (message) {
        var data = JSON.parse(message);
        console.log(data.action);
        if (data.action) {
            switch (data.action) {
                case 'node.new':
                    createNode(data.payload, io);
                    break;
                default:
                    break;
            }
        }
    });
});

var port = process.env.PORT || 4000;
server.listen(port, function(){
    console.log('\033[96mlistening on localhost:' + port + ' \033[39m');
});