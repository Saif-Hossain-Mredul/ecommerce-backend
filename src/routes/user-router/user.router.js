const express = require('express');

const fileUpload = require('../../config/multer-config');

const auth = require('../../middlewares/auth.middleware');
const createUser = require('./route-functions/create-user.rf');
const signInUser = require('./route-functions/sign-in-user.rf');
const signOutUser = require('./route-functions/sign-out-user.rf');
const getProfile = require('./route-functions/get-profile.rf');
const addProfilePicture = require('./route-functions/add-profile-picture.rf');
const updateUser = require('./route-functions/update-user.rf');
const addToCart = require('./route-functions/add-to-cart.rf');
const deleteFromCart = require('./route-functions/delete-from-cart.rf');
const getCartProduct = require('./route-functions/get-cart-products.rf');
const addToWishlist = require('./route-functions/add-to-wishlist.rf');
const deleteFromWishlist = require('./route-functions/delete-from-wishlist.rf');
const getWishlist = require('./route-functions/get-wishlist.rf');

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
userRouter.get('/profile/cart', auth, getCartProduct);

// add product to cart
userRouter.patch('/profile/cart', auth, addToCart);

// remove product from cart
userRouter.delete('/profile/cart', auth, deleteFromCart);

// add product to wishlist, sample request:
// {"productId": "507f1f77bcf86cd799439011"}
userRouter.patch('/profile/wishlist', auth, addToWishlist);

// remove product from whish-list
// {"productId": "507f1f77bcf86cd799439011"}
userRouter.delete('/profile/wishlist', auth, deleteFromWishlist);

// get wishlist products
// Must include skip count in the url  ---> ?skip=10
userRouter.get('/profile/wishlist', auth, getWishlist);

userRouter.post('/profile/confirm-order', auth, confirmOrder);

// add image to profile
userRouter.post(
    '/profile/add-profile-picture',
    auth,
    fileUpload.single('image'),
    addProfilePicture
);

module.exports = userRouter;
