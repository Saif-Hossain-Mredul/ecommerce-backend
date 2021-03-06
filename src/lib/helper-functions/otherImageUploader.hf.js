const uploadCloudinary = require('./uploadCloudinary.hf');

const otherImageUploader = async (files, product, imageField) => {
    files.forEach(async (file) => {
        await uploadCloudinary(
            file,
            `watches/${product.name}/${imageField}`,
            [product.name, product.category, product.brand],
            undefined,
            async (error, result) => {
                if (error) throw new Error(error.message);

                const { public_id, width, height, format, url, secure_url } =
                    result;

                product.otherImages.push({
                    public_id,
                    width,
                    height,
                    format,
                    url,
                    secure_url,
                });

                await product.save();

                return 'Uploaded';
            }
        );
    });

    return { result: 'Uploaded.' };
};

module.exports = otherImageUploader;
