const cloudinary = require('cloudinary').v2;
const uploadCloudinary = require('./uploadCloudinary.hf');

const previewImageUploader = async (file, product, imageField) => {
    if (product.previewImage) {
        cloudinary.uploader.destroy(
            product.previewImage.public_id,
            (error, result) => {
                console.log('Delete result ', result, error);
            }
        );
    }

    await uploadCloudinary(
        file,
        `watches/${product.name}/${imageField}`,
        [product.name, product.category, product.brand],
        undefined,
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

    return { result: 'Uploaded' };
};

module.exports = previewImageUploader;
