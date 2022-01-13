const Product = require('../../../models/product.model');

const updateProduct = async (req, res) => {
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
};

module.exports = updateProduct;
