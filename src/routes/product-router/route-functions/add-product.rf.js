const Product = require('../../../models/product.model');

const addProduct = async (req, res) => {
    try {
        const product = new Product({ ...req.body });

        await product.save();

        res.status(201).send(product);
    } catch (e) {
        res.status(409).send({ error: { status: 409, message: e.message } });
    }
};

module.exports = addProduct;
