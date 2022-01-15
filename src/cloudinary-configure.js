const cloudinary = require('cloudinary').v2;
const SecretKeys = require('./secret-keys');

cloudinary.config({
    cloud_name: SecretKeys.CLOUDINARY_CLOUD_NAME,
    api_key: SecretKeys.CLOUDINARY_API_KEY,
    api_secret: SecretKeys.CLOUDINARY_API_SECRET,
});
