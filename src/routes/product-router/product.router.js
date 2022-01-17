const express = require('express');
require('../../cloudinary-configure');

const multer = require('multer');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');
const previewImageUploader = require('./helper-functions/previewImageUploader.hf');
const displayImageUploader = require('./helper-functions/displayImageUploader.hf');
const otherImageUploader = require('./helper-functions/otherImageUploader.hf');

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
    fileUpload.array('images', 5),
    async (req, res) => {
        try {
            const { id, imageField } = req.params;

            const product = await Product.findOne({ _id: id });

            if (!product) throw new Error('Product not found.');

            if (imageField === 'previewImage') {
                const result = await previewImageUploader(
                    req.files[0],
                    product,
                    imageField
                );
                res.send(result);
            } else if (imageField === 'displayImages') {
                const result = await displayImageUploader(
                    req.files,
                    product,
                    imageField
                );

                res.send(result);
            } else if (imageField === 'otherImages') {
                const result = await otherImageUploader(
                    req.files,
                    product,
                    imageField
                );

                res.send(result);
            } else {
                throw new Error('Invalid field.');
            }
        } catch (e) {
            res.status(409).send(e);
        }
    }
);

module.exports = productRouter;
