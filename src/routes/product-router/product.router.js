const express = require('express');
require('../../cloudinary-configure');

const multer = require('multer');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');

const addProduct = require('./route-functions/add-product.rf');
const updateProduct = require('./route-functions/update-product.rf');
const imageUpload = require('./route-functions/image-upload.rf');

const productRouter = express.Router();

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/products/:id', updateProduct);

// get homepage data
productRouter.get('/products', auth, async (req, res) => {
    let popular = await Product.find()
        .sort({
            rating: 'desc',
        })
        .limit(5);

    popular = popular.map((product) => {
        return product.shortResponse();
    });

    res.send(popular);
});

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
