const express = require('express');

const multer = require('multer');
const fileUpload = require('../../config/multer-config');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');
const Review = require('../../models/review.model');

const addProduct = require('./route-functions/add-product.rf');
const updateProduct = require('./route-functions/update-product.rf');
const imageUpload = require('./route-functions/image-upload.rf');
const getHomePageData = require('./route-functions/get-homepage-data.rf');
const getProductById = require('./route-functions/get-product-by-id.rf');
const submitReview = require('./route-functions/submit-review.rf');
const getReviews = require('./route-functions/get-reviews.rf');

const productRouter = express.Router();

// get homepage data
productRouter.get('/home', auth, getHomePageData);

// get a product by id
productRouter.get('/products/:id', auth, getProductById);

// query products
// URL: GET /products?category=MENS
// URL: GET /products?brand=timex&sortBy=price/name&order=asc&skip=5
productRouter.get('/products', auth, async (req, res) => {
    try {
        const queries = req.query;

        let products = await Product.find({ ...queries })
            .sort({
                [queries.sortBy]: queries.order,
            })
            .skip(parseInt(queries.skip))
            .limit(5);

        products = products.map((product) => product.shortResponse());

        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
});

// get the reviews of a product
// URL: GET /products/61hfbhukdh853hdk/reviews?skip=5
productRouter.get('/products/:id/reviews', auth, getReviews);

// submit a review
productRouter.post('/products/add-review', auth, submitReview);

///
/// this functions are for using by the admin only
///

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/products/:id', updateProduct);

// upload images for a product
// URL: GET /products/image-upload/61hfbhukdh853hdk/previewImage or displayImage or otherImage
productRouter.post(
    '/products/image-upload/:id/:imageField',
    fileUpload.array('images', 5),
    imageUpload
);

module.exports = productRouter;
