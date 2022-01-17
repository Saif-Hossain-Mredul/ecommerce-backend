const cloudinary = require('cloudinary').v2;
const uploadCloudinary = require('./uploadCloudinary.hf');

const previewImageUploader = async (req, product, imageField) => {
    if (product.previewImage) {
        cloudinary.uploader.destroy(
            product.previewImage.public_id,
            (error, result) => {
                console.log('Delete result ', result, error);
            }
        );
    }

    await uploadCloudinary(
        req.file,
        `watches/${product.name}/${imageField}`,
        [product.name, product.category, product.brand],
        async (error, result) => {
            if (error) throw new Error(error.message);

            const { public_id, width, height, format, url, secure_url } =
                result;

            product.previewImage = {
                public_id,
                width,
                height,
                format,
                url,
                secure_url,
            };

            await product.save();

            return 'Uploaded';
        }
    );

    return;
};

module.exports = previewImageUploader;
