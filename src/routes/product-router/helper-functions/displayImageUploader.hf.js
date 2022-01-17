const uploadCloudinary = require('./uploadCloudinary.hf');

const displayImageUploader = async (files, product, imageField) => {
    files.forEach(async (file) => {
        await uploadCloudinary(
            file,
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
    });

    return { result: 'Uploaded.' };
};

module.exports = displayImageUploader;
