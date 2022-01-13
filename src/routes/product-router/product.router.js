const express = require('express');
const Product = require('../../models/product.model');

const productRouter = express.Router();

productRouter.post('/add-product', async (req, res) => {
    try {
        const product = new Product({ ...req.body });

        await product.save();

        res.status(201).send(product);
    } catch (e) {
        res.status(409).send();
    }
});

module.exports = productRouter;
