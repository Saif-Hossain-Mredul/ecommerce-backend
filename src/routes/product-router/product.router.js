const express = require('express');

const auth = require('../../middlewares/auth.middleware')

const addProduct = require('./route-functions/add-product.rf');
const updateProduct = require('./route-functions/update-product.rf');


const productRouter = express.Router();

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/products/:id', updateProduct);

// get homepage data
productRouter.get('/products', auth, async (req, res) => {
    
})

module.exports = productRouter;
