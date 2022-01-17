const express = require('express');
require('../../cloudinary-configure');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

const auth = require('../../middlewares/auth.middleware');
const Product = require('../../models/product.model');

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
        console.log(req.query, req.params.id);
      


        const product = await Product.findOne({ _id: req.params.id });
        if(product.previewImage)

        const uploadedImageStream = await cloudinary.uploader.upload_stream(
            {
                folder: 'watches/mens',
                tags: ['casio', 'mens'],
            },
            (error, result) => {
                console.log(error, result);
            }
        );

        cloudinary.uploader.destroy();

        // streamifier.createReadStream(req.file.buffer).pipe(uploadedImageStream);

        res.send();
    }
);

module.exports = productRouter;
