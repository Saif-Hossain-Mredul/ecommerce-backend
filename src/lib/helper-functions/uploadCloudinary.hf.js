const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const uploadCloudinary = async (
    file,
    folderPath,
    tags,
    public_id,
    callback
) => {
    const uploadedImageStream = await cloudinary.uploader.upload_stream(
        {
            folder: folderPath,
            tags,
            public_id,
            format: 'webp',
        },
        (error, result) => callback(error, result)
    );

    streamifier.createReadStream(file.buffer).pipe(uploadedImageStream);
};

module.exports = uploadCloudinary;
