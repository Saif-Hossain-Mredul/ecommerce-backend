const cloudinary = require('cloudinary');
const uploadCloudinary = require('../../product-router/helper-functions/uploadCloudinary.hf');

const addProfilePicture = async (req, res) => {
    const { file, user } = req;

    if (user.profilePicture) {
        cloudinary.uploader.destroy(
            user.profilePicture.public_id,
            (error, result) => {
                console.log('Delete result ', result, error);
            }
        );
    }

    await uploadCloudinary(
        file,
        `profile-pictures/`,
        [],
        user._id,
        async (error, result) => {
            if (error) throw new Error(error.message);

            const { public_id, width, height, format, url, secure_url } =
                result;

            user.profilePicture = {
                public_id,
                width,
                height,
                format,
                url,
                secure_url,
            };

            await user.save();

            res.send(user);
            return;
        }
    );
};

module.exports = addProfilePicture;
