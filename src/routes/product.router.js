const express = require('express');

const fileUpload = require('../config/multer-config');

const auth = require('../middlewares/auth.middleware');
const addProduct = require('../controllers/product-controllers/add-product.rf');
const updateProduct = require('../controllers/product-controllers/update-product.rf');
const imageUpload = require('../controllers/product-controllers/image-upload.rf');
const getHomePageData = require('../controllers/product-controllers/get-homepage-data.rf');
const getProductById = require('../controllers/product-controllers/get-product-by-id.rf');
const submitReview = require('../controllers/product-controllers/submit-review.rf');
const getReviews = require('../controllers/product-controllers/get-reviews.rf');
const queryProducts = require('../controllers/product-controllers/query-products.rf');

const productRouter = express.Router();

// get homepage data
productRouter.get('/home', auth, getHomePageData);

// get a product by id
productRouter.get('/products/:id', auth, getProductById);

// query products
// URL: GET /products?category=MENS
// URL: GET /products?brand=timex&sortBy=price/name&order=asc&skip=5
// URL: GET /products?brand=Timex&sortBy=rating&order=asc&category=MENS&skip=2
productRouter.get('/products', auth, queryProducts);

// get the reviews of a product
// Must include 'skip' query in url
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
