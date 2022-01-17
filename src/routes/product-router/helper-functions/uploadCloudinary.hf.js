const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const uploadCloudinary = async (file, folderPath, tags, callback) => {
    console.log('came here');
    const uploadedImageStream = await cloudinary.uploader.upload_stream(
        {
            folder: folderPath,
            tags,
        },
        (error, result) => callback(error, result)
    );

    streamifier.createReadStream(file.buffer).pipe(uploadedImageStream);
};

module.exports = uploadCloudinary;