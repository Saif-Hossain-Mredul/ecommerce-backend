const Product = require('../../../models/product.model');
const Review = require('../../../models/review.model');

const submitReview = async (req, res) => {
    try {
        const user = req.user;

        const product = await Product.findOne({ _id: req.body.productId });
        if (!product) throw new Error('Product not found.');

        const review = new Review({
            ...req.body,
            reviewerId: user._id,
            reviewerName: user.name,
        });

        product.reviews.allReviews.push(review._id);
        product.reviews.count = product.reviews.count + 1;

        await review.save();
        await product.save();

        res.status(201).send(review);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

module.exports = submitReview;
