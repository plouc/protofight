var nodes = require('../controllers/nodes');

module.exports = function (app) {
    app.get('/nodes/root', nodes.root);
    app.get('/nodes/search', nodes.search);
    app.post('/nodes', nodes.create);
    app.get('/nodes/pick', nodes.pick);
    app.put('/nodes/:id', nodes.update);
    app.delete('/nodes/:id', nodes.delete);
    app.get('/nodes/:id/children', nodes.children);
};