const path = require('path');
const users = require('../controllers/users.js');
const sellers = require('../controllers/sellers.js');
const products = require('../controllers/products.js');

module.exports = (app) => {
    const baseUrl = '/api/';
    // User Routes
    app.get(baseUrl + 'users', (req, res) => { users.getAll(req, res); });
    app.get(baseUrl + 'users/:id', (req, res) => { users.getById(req, res); });
    app.post(baseUrl + 'users', (req, res) => { users.create(req, res); });
    app.put(baseUrl + 'users/:id', (req, res) => { users.updateById(req, res); });
    app.delete(baseUrl + 'users/:id', (req, res) => { users.removeById(req, res); });
    // Create cart products
    app.post(baseUrl + 'users/cart/:id', (req, res) => { users.createCart(req, res); });

    // Seller Routes
    app.get(baseUrl + 'sellers', (req, res) => { sellers.getAll(req, res); });
    app.get(baseUrl + 'sellers/:id', (req, res) => { sellers.getById(req, res); });
    app.post(baseUrl + 'sellers', (req, res) => { sellers.create(req, res); });
    app.put(baseUrl + 'sellers/:id', (req, res) => { sellers.updateById(req, res); });
    app.delete(baseUrl + 'sellers/:id', (req, res) => { sellers.removeById(req, res); });

    // Product Routes
    app.get(baseUrl + 'products', (req, res) => { products.getAll(req, res); });
    app.get(baseUrl + 'products/:id', (req, res) => { products.getById(req, res); });
    //Need a permission to create a product
    //Use the params sellerid for testing now
    app.post(baseUrl + ':sellerid/products', (req, res) => {
        products.create(req, res);
    });
    //Auth must be detected
    app.put(baseUrl + ':sellerid/products/:id', (req, res) => {
        products.updateById(req, res);
    });
    //Auth must be detected
    app.delete(baseUrl + ':sellerid/products/:id', (req, res) => {
        products.removeById(req, res);
    });



    // Go to client route when the above routes didnot match
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve('./client/dist/client/index.html'));
    });
}