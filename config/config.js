module.exports = {
    development: {
        mongoose: {
            url: 'mongodb://localhost/protofight'
        },
        elasticsearch: {
            host:     'localhost:9200',
            logLevel: ['error', 'warning'],
            //logLevel: 'trace',
            index:    'protofight'
        }
    }
};