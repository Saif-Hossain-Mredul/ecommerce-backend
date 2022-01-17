const express = require('express');
require('../../cloudinary-configure');

const multer = require('multer');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');
const previewImageUploader = require('./helper-functions/previewImageUploader.hf');
const uploadCloudinary = require('./helper-functions/uploadCloudinary.hf');

const addProduct = require('./route-functions/add-product.rf');
const updateProduct = require('./route-functions/update-product.rf');

const productRouter = express.Router();

// adds  new product to the database
productRouter.post('/add-product', addProduct);

// updates a product by a given id
productRouter.patch('/products/:id', updateProduct);

// get homepage data
productRouter.get('/products', auth, async (req, res) => {
    const popular = await Product.find()
        .sort({
            rating: 'desc',
        })
        .limit(5);

    console.log(popular);

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

productRouter.post(
    '/image-upload/:id/:imageField',
    fileUpload.single('image'),
    async (req, res) => {
        try {
            const { id, imageField } = req.params;

            const product = await Product.findOne({ _id: id });

            if (!product) throw new Error('Product not found.');

            if (imageField === 'previewImage') {
                await previewImageUploader(req, product, imageField);
            } else if (imageField === 'displayImages') {
            } else if (imageField === 'otherImages') {
            } else {
            }

            res.send();
        } catch (e) {}
    }
);

module.exports = productRouter;
