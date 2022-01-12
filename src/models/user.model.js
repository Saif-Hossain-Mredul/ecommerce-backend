const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
var jwt = require('jsonwebtoken');
const SecretKeys = require('../secret-keys');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            validate: (email) => {
                if (!validator.isEmail(email))
                    throw new Error('Email is not valid.');
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: (password) => {
                if (password.length < 8)
                    throw new Error('Password length must be greater than 8');
            },
        },
        shippingAddress: [
            {
                address: {
                    type: String,
                },
            },
        ],
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        profilePicture: { type: Buffer },
        inCart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                productName: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        purchasedProducts: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                productName: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
                purchasedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    delete userObject.profilePicture;

    return userObject;
};

// hashing the password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified(['password'])) {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
});

// generates jwt
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, SecretKeys.JWT_SECRET);

    user.tokens.push({ token });

    await user.save();

    return token;
};

// delete auth token
userSchema.methods.deleteAuthToken = async function (token) {
    const user = this;

    user.tokens = user.tokens.filter((savedToken) => savedToken !== token); 

    await user.save();
}

// find an user and logs in
userSchema.statics.findAndLoginByCredentials = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('No user found');

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new Error('Password does not match.');

    return user;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
