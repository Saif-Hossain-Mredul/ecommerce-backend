const express = require('express');

const fileUpload = require('../config/multer-config');

const auth = require('../middlewares/auth.middleware');
const createUser = require('../controllers/user-controllers/create-user.rf');
const signInUser = require('../controllers/user-controllers/sign-in-user.rf');
const signOutUser = require('../controllers/user-controllers/sign-out-user.rf');
const getProfile = require('../controllers/user-controllers/get-profile.rf');
const addProfilePicture = require('../controllers/user-controllers/add-profile-picture.rf');
const updateUser = require('../controllers/user-controllers/update-user.rf');
const addToCart = require('../controllers/user-controllers/add-to-cart.rf');
const deleteFromCart = require('../controllers/user-controllers/delete-from-cart.rf');
const getCartProduct = require('../controllers/user-controllers/get-cart-products.rf');
const addToWishlist = require('../controllers/user-controllers/add-to-wishlist.rf');
const deleteFromWishlist = require('../controllers/user-controllers/delete-from-wishlist.rf');
const getWishlist = require('../controllers/user-controllers/get-wishlist.rf');
const confirmOrder = require('../controllers/user-controllers/confirm-order.rf')

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
