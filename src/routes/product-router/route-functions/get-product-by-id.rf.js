const Product = require('../../../models/product.model');

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) throw new Error('Product not found.');

        res.send(product);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports = getProductById;
