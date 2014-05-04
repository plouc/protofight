var nodes = require('../controllers/nodes');

module.exports = function (app) {
    app.get('/nodes/root', nodes.root);
    app.post('/nodes', nodes.create);
    app.get('/nodes/:id/children', nodes.children);
};