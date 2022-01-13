const express = require('express');
const addProduct = require('./route-functions/add-product.rf');

const updateProduct = require('./route-functions/update-product.rf');

const productRouter = express.Router();

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/product/:id', updateProduct);

module.exports = productRouter;
