var nodes = require('../controllers/nodes');

module.exports = function (app) {
    app.get('/nodes/root', nodes.root);
    app.post('/nodes', nodes.create);
    app.put('/nodes/:id', nodes.update);
    app.get('/nodes/:id/children', nodes.children);
};