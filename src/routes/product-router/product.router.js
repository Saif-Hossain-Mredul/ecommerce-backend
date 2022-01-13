const express = require('express');
const Product = require('../../models/product.model');

const updateProduct = require('./route-functions/update-product.rf');

const productRouter = express.Router();

// adds  new product to the database
productRouter.post('/add-product', async (req, res) => {
    try {
        const product = new Product({ ...req.body });

        await product.save();

        res.status(201).send(product);
    } catch (e) {
        res.status(409).send();
    }
});

// updates a product by a given id
productRouter.patch('/product/:id', updateProduct);

module.exports = productRouter;
