const express = require('express');
const Product = require('../../models/product.model');
const userRouter = require('../user-router/user.router');

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

userRouter.patch('/product/:id', async (req, res) => {
    const requestedUpdates = Object.keys(req.body);
    const allowedUpdates = [
        'name',
        'category',
        'brand',
        'specification',
        'price',
    ];
    const isAllowedToUpdate = requestedUpdates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isAllowedToUpdate) throw new Error('Invalid Update field.');

    try {
        const product = await Product.findById({ _id: req.params.id });

        if (!product) throw new Error('Can not find product.');

        requestedUpdates.forEach((updateField) => {
            product[updateField] = req.body[updateField];
        });

        await product.save();

        res.send(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = productRouter;