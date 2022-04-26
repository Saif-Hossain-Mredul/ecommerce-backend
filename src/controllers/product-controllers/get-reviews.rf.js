const Product = require('../../models/product.model');

const getReviews = async (req, res) => {
    const { skip } = req.query;
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) throw new Error('Product not found.');

        await product.populate({
            path: 'reviews.allReviews',
            options: {
                limit: 5,
                skip: parseInt(skip),
            },
        });

        res.send(product.reviews);
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = getReviews;
