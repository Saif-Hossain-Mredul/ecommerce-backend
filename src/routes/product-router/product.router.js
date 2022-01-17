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

const uploadCloudinary = async (req, folderPath, tags, callback) => {
    console.log('came here');
    const uploadedImageStream = await cloudinary.uploader.upload_stream(
        {
            folder: folderPath,
            tags,
        },
        (error, result) => callback(error, result)
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadedImageStream);
};

productRouter.post(
    '/image-upload/:id/:imageField',
    fileUpload.single('image'),
    async (req, res) => {
        try {
            const { id, imageField } = req.params;

            const product = await Product.findOne({ _id: id });

            if (!product) throw new Error('Product not found.');

            if (imageField === 'previewImage') {
                // cloudinary.uploader.destroy(
                //     product.previewImage.public_id,
                //     (result) => {
                //         console.log(result);
                //     }
                // );

                const uploadResult = await uploadCloudinary(
                    req,
                    `watches/${product.name}/${imageField}`,
                    [product.name, product.category, product.brand],
                    async (error, result) => {
                        const {
                            public_id,
                            width,
                            height,
                            format,
                            url,
                            secure_url,
                        } = result;

                        product.previewImage = {
                            public_id,
                            width,
                            height,
                            format,
                            url,
                            secure_url,
                        };

                        await product.save();

                        return;
                    }
                );

                console.log(uploadResult);
            } else if (imageField === 'displayImages') {
            } else if (imageField === 'otherImages') {
            } else {
            }

            res.send();
        } catch (e) {}
    }
);

// {
//     "public_id": "watches/mens/go757eix0lk7rfkdbnml",
//     "width": 1000,
//     "height": 1000,
//     "format": "png",
//     "url":"http://res.cloudinary.com/dcl77ditl/image/upload/v1642397856/watches/mens/go757eix0lk7rfkdbnml.png",
//     "secure_url": "https://res.cloudinary.com/dcl77ditl/image/upload/v1642397856/watches/mens/go757eix0lk7rfkdbnml.png",
// }

module.exports = productRouter;
