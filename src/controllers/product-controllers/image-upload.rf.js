const Product = require('../../models/product.model');
const previewImageUploader = require('../../lib/helper-functions/previewImageUploader.hf');
const displayImageUploader = require('../../lib/helper-functions/displayImageUploader.hf');
const otherImageUploader = require('../../lib/helper-functions/otherImageUploader.hf');

const imageUpload = async (req, res) => {
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
        res.status(409).send({ error: { status: 409, message: e.message } });
    }
    
};

module.exports = imageUpload;
