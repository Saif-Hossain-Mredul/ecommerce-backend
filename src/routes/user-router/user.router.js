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
const updateUser = require('./route-functions/update-user.rf');

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
userRouter.patch('/profile', auth, updateUser);

// get cart products
userRouter.get('/profile/cart', auth, (req, res) => {
    try {
        res.send(req.user.inCart);
    } catch (e) {
        res.status(400).send();
    }
});

// add product to cart
userRouter.patch('/profile/cart', auth, async (req, res) => {
    const productIndex = req.user.inCart.findIndex((product) => {
        return product.productId.toString() === req.body.productId;
    });

    if (productIndex === -1) {
        req.user.inCart.push({ ...req.body });
    } else {
        req.user.inCart[productIndex].quantity += 1;
    }

    await req.user.save();

    res.send();
});

// remove product from cart
userRouter.delete('/profile/cart', auth, async (req, res) => {
    const productIndex = req.user.inCart.findIndex((product) => {
        return product.productId.toString() === req.body.productId;
    });

    if (req.user.inCart[productIndex].quantity === 1) {
        req.user.inCart = req.user.inCart.filter(
            (product) => product.productId.toString() !== req.body.productId
        );
    } else {
        req.user.inCart[productIndex].quantity -= 1;
    }

    await req.user.save();

    res.send();
});

// add image to profile
userRouter.post(
    '/profile/add-profile-picture',
    auth,
    fileUpload.single('image'),
    addProfilePicture
);

module.exports = userRouter;
