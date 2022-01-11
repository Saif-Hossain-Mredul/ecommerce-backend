const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
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

const User = new mongoose.model('User', userSchema);

module.exports = User;
