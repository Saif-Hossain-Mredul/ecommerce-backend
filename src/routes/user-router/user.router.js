const express = require('express');
const User = require('../../models/user.model');
const multer = require('multer');
const cloudinary = require('cloudinary');
const fileUpload = require('../../config/multer-config');

const auth = require('../../middlewares/auth.middleware');
const createUser = require('./route-functions/create-user.rf');
const signInUser = require('./route-functions/sign-in-user.rf');
const signOutUser = require('./route-functions/sign-out-user.rf');
const getProfile = require('./route-functions/get-profile.rf');
const uploadCloudinary = require('../product-router/helper-functions/uploadCloudinary.hf');
const addProfilePicture = require('./route-functions/add-profile-picture.rf');

const userRouter = express.Router();

// creates new user
userRouter.post('/sign-up', createUser);

// sign in route
userRouter.post('/sign-in', signInUser);

// sign-out route
userRouter.post('/sign-out', auth, signOutUser);

//get profile
userRouter.get('/profile', auth, getProfile);

// update user profile
userRouter.patch('/profile', auth, async (req, res) => {
    const { name, password, shippingAddress } = req.body;
    const user = req.user;

    const allowedUpdates = ['name', 'password', 'shippingAddress'];
    const requestedUpdates = Object.keys(req.body);

    const isAllowedToUpdate = requestedUpdates.every((updateField) =>
        allowedUpdates.includes(updateField)
    );

    if (!isAllowedToUpdate) {
        throw new Error('Invalid update field.');
    }

    if (name) user.name = name;
    if (password) user.password = password;
    if (shippingAddress) {
        user.shippingAddress.push({ address: shippingAddress });
    }

    await user.save();

    res.send(user);
});

// add image to profile
userRouter.post(
    '/profile/add-profile-picture',
    auth,
    fileUpload.single('image'),
    addProfilePicture
);

module.exports = userRouter;
