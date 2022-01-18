const express = require('express');
require('../../cloudinary-configure');

const multer = require('multer');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');

const addProduct = require('./route-functions/add-product.rf');
const updateProduct = require('./route-functions/update-product.rf');
const imageUpload = require('./route-functions/image-upload.rf');
const getHomePageData = require('./route-functions/get-homepage-data.rf');
const getProductById = require('./route-functions/get-product-by-id.rf');
const Review = require('../../models/review.model');

const productRouter = express.Router();

// get homepage data
productRouter.get('/products', auth, getHomePageData);

// get a product by id
productRouter.get('/products/:id', auth, getProductById);

// get the reviews of a product
productRouter.get('/products/:id/reviews', auth, async (req, res) => {
    const { skip } = req.query;
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) throw new Error('Product not found.');

        await product.populate({
            path: 'reviews.allReviews',
            options: {
                limit: 10,
                skip: parseInt(skip),
            },
        });

        res.send(product.reviews);
    } catch (e) {}
});

// submit a review
productRouter.post('/products/add-review', auth, async (req, res) => {
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
});

///
/// this functions are for using by the admin only
///

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/products/:id', updateProduct);

const fileUpload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        cb(undefined, true);
    },
});

// upload images for a product
productRouter.post(
    '/image-upload/:id/:imageField',
    fileUpload.array('images', 5),
    imageUpload
);

module.exports = productRouter;
